import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import type { Session } from "next-auth";
import User from "@/model/userModel";
import Doctor from "@/model/doctorModel";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

// Optional: database user type
type DBUser = {
  id: string;
  _id: string;
  name: string;
  email: string;
  role?: string;
  image?: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: {
    line1?: string;
    line2?: string;
  };
  token?: string;
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        expo: { label: "Expo", type: "text", optional: true },
      },
      async authorize(
        credentials: Record<"email" | "password" | "expo", string> | undefined,
        req?: any
      ): Promise<DBUser | null> {
        await connectDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        let user = await User.findOne({ email: credentials.email });

        if (!user) {
          user = await Doctor.findOne({ email: credentials.email });
          if (!user) throw new Error("No user found");
        }

        if (user.bannedUntil && new Date(user.bannedUntil) > new Date()) {
          const banTime = new Date(user.bannedUntil).toLocaleString("en-US", {
            timeZone: "Africa/Mogadishu",
          });
          throw new Error(`User banned until ${banTime}`);
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Invalid password");

        const isExpo =
          typeof credentials?.expo === "string" && credentials.expo === "1";

        const token = jwt.sign(
          { id: user._id.toString(), email: user.email, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "1h" }
        );

        return {
          _id: user._id.toString(),
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob,
          address: user.address,
          token: isExpo ? token : undefined,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1 hour
  },

  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: DBUser;
      trigger?: "signIn" | "update" | "signUp";
      session?: Partial<DBUser>;
    }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.image = user.image;
        token.phone = user.phone;
        token.gender = user.gender;
        token.dob = user.dob;
        token.address = user.address;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }

      if (token.exp && Date.now() >= Number(token.exp) * 1000) {
        throw new Error("Session expired");
      }

      if (trigger === "update" && session) {
        token.phone = session.phone;
        token.gender = session.gender;
        token.dob = session.dob;
        token.address = session.address;
        token.image = session.image;
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.phone = token.phone as string;
        session.user.gender = token.gender as string;
        session.user.dob = token.dob as string;
        session.user.address = token.address as {
          line1?: string;
          line2?: string;
        };
        session.expires = new Date(Number(token.exp) * 1000).toISOString();
      }

      const freshUser =
        (await User.findById(token.id)) || (await Doctor.findById(token.id));
      if (freshUser) {
        session.user.phone = freshUser.phone;
        session.user.gender = freshUser.gender;
        session.user.dob = freshUser.dob;
        session.user.address = freshUser.address;
        session.user.image = freshUser.image;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
