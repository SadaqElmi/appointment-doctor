"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { assets } from "@/mockdata/assets";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import toast from "react-hot-toast";

type Appointment = {
  _id: string;
  userData?: {
    image?: string;
    name?: string;
    age?: number;
  };
  docData?: {
    image?: string;
    name?: string;
    department?: string;
    fees?: number;
  };
  slotDate?: string;
  amount?: number;
  status?: string;
};

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Fetch Appointments
  useEffect(() => {
    axios
      .get("/api/getAppointments")
      .then((res) => {
        if (res.data.success) setAppointments(res.data.appointments);
      })
      .catch((err) => console.error("Failed to fetch appointments:", err));
  }, []);

  // Delete Appointment
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`/api/deleteAppointment/${id}`);
      if (res.data.success) {
        setAppointments((prev) => prev.filter((a) => a._id !== id));
        toast.success("Appointment deleted successfully");
      } else {
        toast.error("Failed to delete appointment");
        console.error("Failed to delete appointment:", res.data.message);
      }
    } catch (err) {
      console.error("Error deleting appointment:", err);
      toast.error("Failed to delete appointment");
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-xl mb-4">All Appointments</h1>
      <div className="overflow-x-auto rounded-lg border border-[#E6E8F0] shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead>#</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="ml-5">Department</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center text-gray-400 py-6"
                >
                  No appointments found.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment: Appointment, index) => (
                <TableRow key={appointment._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={appointment.userData?.image || assets.profile_pic}
                      alt="patient"
                      width={30}
                      height={30}
                      className="rounded-full"
                      priority
                    />
                    {appointment.userData?.name || "Unknown Patient"}
                  </TableCell>
                  <TableCell>{appointment.docData?.department}</TableCell>
                  <TableCell>{appointment.userData?.age}</TableCell>
                  <TableCell>{appointment.slotDate}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={appointment.docData?.image || assets.profile_pic}
                      alt="doctor"
                      width={30}
                      height={30}
                      className="rounded-full"
                      priority
                    />
                    {appointment.docData?.name || "Unknown Doctor"}
                  </TableCell>
                  <TableCell>${appointment?.docData?.fees}</TableCell>
                  <TableCell>{appointment?.status}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleDelete(appointment._id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                    >
                      <X size={14} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Appointments;
