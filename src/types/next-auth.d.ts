// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      _id: string;
      id: string;
      name: string;
      email: string;
      image?: string;
      role?: string;
      phone?: string;
      gender?: string;
      dob?: string;
      address?: {
        line1?: string;
        line2?: string;
      };
    };
  }

  interface User extends DefaultUser {
    _id: string;
    id: string;
    name: string;
    email: string;
    image?: string;
    role?: string;
    phone?: string;
    gender?: string;
    age?: number;
    dob?: string;
    address?: {
      line1?: string;
      line2?: string;
    };
  }
}
