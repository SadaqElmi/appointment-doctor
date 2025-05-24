"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DoctorPanel = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/api/doctor/appointments");
        if (res.data.success) {
          setAppointments(res.data.appointments);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id: string) => {
    try {
      await axios.put(`/api/doctor/appointments/cancel/${id}`);
      setAppointments((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "cancelled" } : a))
      );
    } catch (err) {
      console.error("Cancel failed:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="font-semibold text-xl mb-4">All Appointments</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#E6E8F0] shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F9FAFB]">
                <TableHead>#</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((app, index) => (
                <TableRow key={app._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Image
                      src={app.userData?.image || "/default.png"}
                      alt="patient"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                    {app.userData?.name}
                  </TableCell>
                  <TableCell>{app.userData?.age || "N/A"}</TableCell>
                  <TableCell>
                    {app.slotDate} @ {app.slotTime}
                  </TableCell>
                  <TableCell className="capitalize font-medium">
                    {app.status}
                  </TableCell>
                  <TableCell>
                    {app.status === "upcoming" && (
                      <button
                        onClick={() => handleCancel(app._id)}
                        className="bg-red-100 text-red-600 hover:bg-red-200 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default DoctorPanel;
