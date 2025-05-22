"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Appointment = {
  _id: string;
  cancelled?: number;
  slotDate?: string;
  slotTime?: string;
  docId?: {
    image?: string;
    name?: string;
    specialization?: string;
    address?: {
      street?: string;
      city?: string;
    };
  };
};

const MyAppointments = () => {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      axios
        .post("/api/myAppointments", { userId: session.user.id })
        .then((res) => {
          if (res.data.success) {
            setAppointments(res.data.appointments);
          }
        })
        .catch((err) => console.error("Failed to fetch appointments", err));
    }
  }, [session]);
  useEffect(() => {
    console.log("Appointments:", appointments); // ✅ Add this
  }, [appointments]);

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const res = await axios.post("/api/cancelAppointment", { appointmentId });
      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((a: any) =>
            a._id === appointmentId ? { ...a, cancelled: 1 } : a
          )
        );
      }
    } catch (err) {
      console.error("Cancellation failed:", err);
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>Please log in to see your appointments.</p>;

  return (
    <div className="max-w-6xl mx-auto">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My appointments (
        {appointments.filter((a: any) => a.cancelled !== 1).length})
      </p>

      {appointments.filter((a: any) => a.cancelled !== 1).length === 0 ? (
        <p className="mt-6 text-gray-500">No upcoming appointments</p>
      ) : (
        appointments
          .filter((a: any) => a.cancelled !== 1)
          .map((appointment: any) => (
            <div
              key={appointment._id}
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
            >
              <div>
                <Image
                  className="w-36 h-36 object-cover rounded bg-[#EAEFFF]"
                  src={appointment.docId?.image || "/fallback.jpg"}
                  alt="Doctor"
                  width={144}
                  height={144}
                />
              </div>
              <div className="flex-1 text-sm text-[#5E5E5E]">
                <p className="text-[#262626] text-base font-semibold">
                  {appointment.docId?.name}
                </p>
                <p>{appointment.docId?.specialization}</p>
                <p className="mt-1">
                  <span className="font-medium text-[#3C3C3C]">Address:</span>
                  <br />
                  {appointment.docId?.address?.street}
                  <br />
                  {appointment.docId?.address?.city}
                </p>
                <p className="mt-1">
                  <span className="font-medium text-[#3C3C3C]">
                    Date & Time:
                  </span>{" "}
                  {appointment.slotDate} | {appointment.slotTime}
                </p>
                {appointment.cancelled === 1 && (
                  <p className="text-red-500 text-xs mt-1">Cancelled</p>
                )}
              </div>
              <div className="flex flex-col gap-2 justify-end text-sm text-center">
                <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300">
                  Pay Online
                </button>
                {/*<button
                  onClick={() => cancelAppointment(appointment._id)}
                  className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#ff5f5f] hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>*/}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#ff5f5f] hover:text-white transition-all duration-300"
                    >
                      Cancel appointment
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-[#696969] sm:min-w-8 py-2 border rounded hover:bg-[#ff5f5f] hover:text-white transition-all duration-300">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="text-[#696969] sm:min-w-8 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300 bg-transparent"
                        onClick={() => cancelAppointment(appointment._id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
      )}
    </div>
  );
};

export default MyAppointments;
