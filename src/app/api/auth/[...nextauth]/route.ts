// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions, Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            name: "Sadaq",
            email: "sadaq@gmail.com",
            password: "sadaq123",
            role: "user",
          },
          {
            id: "2",
            name: "admin",
            email: "admin@gmail.com",
            password: "admin123",
            role: "admin",
          },
        ];

        if (!credentials?.email || !credentials.password) return null;

        const user = users.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        return user ?? null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email ?? "";
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && token.email) {
        session.user = session.user ?? { id: "", email: "", role: "" };
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
