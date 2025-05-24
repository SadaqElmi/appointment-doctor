"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

const specialities = [
  "All",
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

type Doctor = {
  available: boolean;
  _id: string;
  name: string;
  image: string;
  specialization: string;
};

const Doctors = () => {
  const [selectedSpecialist, setSelectedSpecialist] = useState("All");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const { speciality } = useParams();

  const decodedSpeciality = decodeURIComponent(
    Array.isArray(speciality) ? speciality[0] : speciality || "All"
  );

  useEffect(() => {
    setSelectedSpecialist(decodedSpeciality);
  }, [decodedSpeciality]);

  useEffect(() => {
    axios
      .get("/api/doctor")
      .then((res) => {
        if (res.data.success) setDoctors(res.data.doctors);
      })
      .catch((err) => console.error("Failed to fetch doctors:", err));
  }, []);

  const filteredDoctors =
    selectedSpecialist === "All"
      ? doctors
      : doctors.filter((doc) => doc.specialization === selectedSpecialist);

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
                router.push(`/dashboard/doctors/${encodeURIComponent(spec)}`);
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
          {filteredDoctors.map((item) => (
            <div
              key={item._id}
              onClick={() => router.push(`/dashboard/appointment/${item._id}`)}
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[252px]"
            >
              <Image
                src={item.image}
                className="w-full object-contain h-[222px] bg-[#EAEFFF]"
                alt="Doctor"
                width={252}
                height={222}
                priority
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    item.available ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 rounded-full ${
                      item.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></p>
                  <p>{item.available ? "Available" : "Unavailable"}</p>
                </div>

                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm font-light">
                  {item.specialization}
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
