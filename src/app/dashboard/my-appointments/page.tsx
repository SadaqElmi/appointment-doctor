"use client";

import { doctors } from "@/mockdata/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(storedAppointments);
  }, []);

  const handleCancelAppointment = (timestamp: string) => {
    const updatedAppointments = appointments.filter(
      (appt) => appt.timestamp !== timestamp
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
    setAppointments(updatedAppointments);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <p className="pb-3 mt-12 text-lg font-medium text-gray-600 border-b">
        My appointments ({appointments.length})
      </p>

      {appointments.length === 0 ? (
        <p className="mt-6 text-gray-500">No upcoming appointments</p>
      ) : (
        appointments.map((appointment) => (
          <div
            key={appointment.timestamp}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b"
          >
            <div>
              <Image
                className="w-36 bg-[#EAEFFF]"
                src={
                  doctors.find((d) => d._id === appointment.doctorId)?.image ||
                  doctors[0].image
                }
                alt="Profile"
                priority
              />
            </div>
            <div className="flex-1 text-sm text-[#5E5E5E]">
              <p className="text-[#262626] text-base font-semibold">
                {appointment.doctorName}
              </p>
              <p>{appointment.speciality}</p>
              <p className="text-[#464646] font-medium mt-1">Address:</p>
              <p>{appointment.address?.line1}</p>
              <p>{appointment.address?.line2}</p>
              <p className="mt-1">
                <span className="text-sm text-[#3C3C3C] font-medium">
                  Date & Time:
                </span>
                {new Date(appointment.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}{" "}
                | {appointment.time}
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-end text-sm text-center">
              <button className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#5f6fff] hover:text-white transition-all duration-300">
                Pay Online
              </button>
              <button
                onClick={() => handleCancelAppointment(appointment.timestamp)}
                className="text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-[#ff5f5f] hover:text-white transition-all duration-300"
              >
                Cancel appointment
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyAppointments;
