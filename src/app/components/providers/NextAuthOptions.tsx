import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/model/userModel";
import { connectDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("No user found");

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

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          image: user.image,
          phone: user.phone,
          gender: user.gender,
          dob: user.dob,
          address: user.address,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  callbacks: {
    async jwt({
      token,
      user,

      trigger,

      session,
    }: {
      token: any;
      user?: any;

      trigger?: "signIn" | "update" | "signUp";

      session?: any;
    }) {
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

      if (token.exp && Date.now() >= token.exp * 1000) {
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

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image;
        session.user.phone = token.phone;
        session.user.gender = token.gender;
        session.user.dob = token.dob;
        session.user.address = token.address;
        session.expires = new Date(token.exp * 1000).toISOString();
      }
      const freshUser = await User.findById(token.id);
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
