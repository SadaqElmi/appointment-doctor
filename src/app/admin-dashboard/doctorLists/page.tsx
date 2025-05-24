"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

type Doctor = {
  _id: string;
  name: string;
  image: string;
  specialization: string;
  available: boolean;
};

const DoctorLists = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/doctor")
      .then((res) => {
        if (res.data.success) setDoctors(res.data.doctors);
      })
      .catch((err) => console.error("Error loading doctors:", err))
      .finally(() => setLoading(false));
  }, []);
  const toggleAvailability = async (id: string, newValue: boolean) => {
    try {
      const res = await axios.put(`/api/doctor/${id}/availability`, {
        available: newValue,
      });

      if (res.data.success) {
        setDoctors((prev) =>
          prev.map((doc) =>
            doc._id === id ? { ...doc, available: newValue } : doc
          )
        );
      }
    } catch (err: any) {
      console.error("Error updating availability:", err);
      toast.error("Failed to update availability:");
    }
  };

  if (loading)
    return <div className="p-4 text-gray-600">Loading doctors...</div>;

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <Image
              src={item.image}
              className="w-full object-contain h-[222px] bg-[#EAEFFF]"
              alt="Doctor"
              width={224}
              height={222}
              priority
            />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm font-light">
                {item.specialization}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => toggleAvailability(item._id, !item.available)}
                />

                <p>{item.available ? "Available" : "Unavailable"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorLists;
