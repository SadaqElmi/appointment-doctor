// store/useDoctorStore.ts
import { create } from "zustand";

interface DoctorType {
  _id: string;
  name: string;
  specialization: string;
  image: string;
  available: boolean;
  fees: number;
}

interface DoctorStore {
  doctor: DoctorType | null;
  setDoctor: (doctor: DoctorType) => void;
  clearDoctor: () => void;
}

export const useDoctorStore = create<DoctorStore>((set) => ({
  doctor: null,
  setDoctor: (doctor) => set({ doctor }),
  clearDoctor: () => set({ doctor: null }),
}));
