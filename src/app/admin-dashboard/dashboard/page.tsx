"use client";

import React, { useEffect, useState } from "react";
import { assets_admin } from "@/mockdata/assentAdmin";
import { assets } from "@/mockdata/assets";
import Image from "next/image";
import axios from "axios";
import { X } from "lucide-react";

const Dashboard_Admin = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios.get("/api/doctor").then((res) => {
      if (res.data.success) setDoctors(res.data.doctors);
    });
    axios.get("/api/getAppointments").then((res) => {
      if (res.data.success) setAppointments(res.data.appointments);
    });
    axios.get("/api/getUsers").then((res) => {
      if (res.data.success) {
        const patientUsers = res.data.users.filter(
          (user: any) => user.role === "user"
        );
        setPatients(patientUsers);
      }
    });
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
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-10">
        {/* Doctors */}
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.doctor_icon}
              alt="Doctors"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">{doctors.length}</p>
            <p className="text-[#8893B0]">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.appointments_icon}
              alt="Appointments"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">{appointments.length}</p>
            <p className="text-[#8893B0]">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.patients_icon}
              alt="Patients"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">{patients.length}</p>
            <p className="text-[#8893B0]">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Appointment Table */}
      <div className="min-h-[100vh] flex-1 rounded-xl bg-[#FFFFFF] md:min-h-min border border-[#E6E8F0] shadow-md">
        <div className="px-5 py-3 flex gap-2 items-center">
          <Image
            src={assets_admin.list_icon}
            alt="list_icon"
            className="h-6 w-6 rounded"
          />
          <p className="font-medium text-[18px]">Latest Appointments</p>
        </div>
        <hr className="mt-1" />

        {appointments.length === 0 ? (
          <p className="p-5 text-gray-500">No upcoming appointments</p>
        ) : (
          <div className="flex flex-col gap-2 my-4">
            {appointments.map((appointment, index) => (
              <div
                key={appointment._id}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={appointment.docData?.image || assets.profile_pic}
                    alt="doctor_icon"
                    className="h-[52px] w-[52px] rounded-full object-cover"
                    width={52}
                    height={52}
                  />
                  <div className="flex flex-col">
                    <p className="text-[18px] font-medium">
                      {appointment.docData?.name}
                    </p>
                    <p className="text-[#696B80] text-[16px] font-normal">
                      Booking on {appointment.slotDate}, {appointment.slotTime}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="capitalize text-sm text-gray-500">
                    {appointment.status}
                  </span>
                  {appointment.status === "upcoming" && (
                    <button
                      onClick={() => handleCancel(appointment._id)}
                      className="bg-red-100 text-red-600 hover:bg-red-200 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard_Admin;
