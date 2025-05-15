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
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // optional: session auto-refresh interval in seconds
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.role = user.role;
        token.exp = Math.floor(Date.now() / 1000) + 60 * 60;
      }
      if (token.exp && Date.now() >= token.exp * 1000) {
        throw new Error("Session expired");
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role;
        session.expires = new Date(token.exp * 1000).toISOString(); // optional
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
