import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

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
        token.id = user.id;
        token.email = user.email ?? "";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && token.email) {
        if (session.user) {
          session.user.id = token.id;
          session.user.email = token.email;
        }
      }
      return session;
    },
  },
};
