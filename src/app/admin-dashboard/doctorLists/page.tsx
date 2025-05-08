import { doctors } from "@/mockdata/assets";
import Image from "next/image";
import React from "react";

const DoctorLists = () => {
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg font-medium">All Doctors</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group"
          >
            <Image
              src={item.image}
              className="w-full object-contain h-[222px] bg-[#EAEFFF]"
              alt="Doctors"
              priority
            />
            <div className="p-4">
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm font-light">
                {item.speciality}
              </p>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <input type="checkbox" checked readOnly />

                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorLists;
