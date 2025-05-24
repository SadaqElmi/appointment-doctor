"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

// Define the Doctor type
type Doctor = {
  available: boolean;
  _id: string;
  name: string;
  image: string;
  specialization: string;
};

function TopDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/doctor")
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.doctors);
        }
      })
      .catch((err) => console.error("Failed to fetch doctors:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-lg">
        Loading doctors...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 mb-16">
      <div className="flex flex-col gap-3 justify-center items-center w-2/4 mb-20">
        <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
        <p className="text-lg font-extralight text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4 sm:px-0">
        {doctors.map((item) => (
          <div
            key={item._id}
            onClick={() => {
              if (!item.available) {
                toast.success("Doctor is currently unavailable.");
                return;
              }
              router.push(`/dashboard/appointment/${item._id}`);
            }}
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

              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm font-light">
                {item.specialization}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Button className="bg-[#C9D8FF] text-[#4F4F4F] hover:bg-[#C9D8FF] hover:text-[#4F4F4F] border-none mt-10 rounded-full text-sm font-medium px-10 py-5 cursor-pointer">
          More
        </Button>
      </div>
    </div>
  );
}

export default TopDoctors;
