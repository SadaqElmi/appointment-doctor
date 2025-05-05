"use client";

import { Button } from "@/components/ui/button";
import { doctors, specialityData } from "@/mockdata/assets";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const specialities = [
  "All",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const Doctors = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const router = useRouter();
  const { speciality } = useParams();

  const decodedSpeciality = decodeURIComponent(
    Array.isArray(speciality) ? speciality[0] : speciality || "All"
  );

  useEffect(() => {
    setSelectedSpecialist(decodedSpeciality);
  }, [decodedSpeciality]);

  const filteredDoctors =
    selectedSpecialist === "All"
      ? doctors
      : doctors.filter((doc) => doc.speciality === selectedSpecialist);

  return (
    <div>
      <p className="text-gray-600">Browse through the doctors specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          className="py-1 px-3 border rounded text-sm transition-all sm:hidden"
        >
          {showFilters ? "Hide Filters" : "Filter"}
        </Button>

        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilters ? "flex" : "hidden"
          } sm:flex`}
        >
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => {
                setSelectedSpecialist(spec);
                router.push(`/dashbord/doctors/${encodeURIComponent(spec)}`);
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                selectedSpecialist === spec ? "bg-blue-100 font-medium" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-6">
          {filteredDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/dashbord/appointment/${item._id}`)}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[252px]"
            >
              <Image
                src={item.image}
                className="w-full object-contain h-[222px] bg-[#EAEFFF]"
                alt="Doctor"
                priority
                width={252}
                height={222}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm font-light">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
