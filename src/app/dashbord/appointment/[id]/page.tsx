"use client";

import { useParams } from "next/navigation";
import { doctors } from "@/mockdata/assets";
import Image from "next/image";
import React from "react";
import { assets } from "@/mockdata/assets";

const AppointmentDoctor = () => {
  const { id } = useParams();

  const doctor = doctors.find((doc) => doc._id === id);

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <Image
            src={doctor.image}
            alt={doctor.name}
            className="bg-[#5f6fff] w-[280px] h-full sm:max-w-72 rounded-lg"
          />
        </div>
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-md">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {doctor.name}
            <Image src={assets.verified_icon} className="w-5" alt="verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {doctor.degree} - {doctor.speciality}
            </p>
            <button className=" py-0.5 px-2 border text-xs rounded-full">
              {doctor.experience} Years
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <Image src={assets.info_icon} className="w-4" alt="about" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {doctor.about}
            </p>
          </div>

          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: ${doctor.fees}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDoctor;
