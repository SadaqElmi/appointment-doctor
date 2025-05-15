import { authOptions } from "@/app/components/providers/NextAuthOptions";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
