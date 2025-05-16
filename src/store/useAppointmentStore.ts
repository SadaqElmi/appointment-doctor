// store/useAppointmentStore.ts
import { create } from "zustand";

interface AppointmentType {
  userId: string;
  docId: string;
  slotDate: string;
  slotTime: string;
  amount: number;
  isCompleted: boolean;
  payment: boolean;
  cancelled: number;
}

interface AppointmentStore {
  appointment: AppointmentType | null;
  setAppointment: (appt: AppointmentType) => void;
  clearAppointment: () => void;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointment: null,
  setAppointment: (appt) => set({ appointment: appt }),
  clearAppointment: () => set({ appointment: null }),
}));
