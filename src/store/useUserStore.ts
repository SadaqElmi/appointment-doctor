// store/useUserStore.ts
import { create } from "zustand";

interface UserType {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role?: string;
  phone?: string;
}

interface UserStore {
  user: UserType | null;
  setUser: (user: UserType) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
