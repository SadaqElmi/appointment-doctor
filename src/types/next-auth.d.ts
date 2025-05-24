declare module "next-auth" {
  interface Session {
    expires: string;
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

  interface User {
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
