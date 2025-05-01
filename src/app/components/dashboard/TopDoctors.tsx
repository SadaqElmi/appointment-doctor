import Image from "next/image";
import React from "react";
import { doctors } from "@/mockdata/assets";
import { Button } from "@/components/ui/button";
function TopDoctors() {
  return (
    <div className="flex flex-col items-center justify-center py-10 mb-16 ">
      <div className="flex flex-col gap-3 justify-center items-center w-2/4 mb-20">
        <h1 className="  text-3xl font-medium">Top Doctors to Book</h1>
        <p className="text-lg  font-extralight text-center">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>
      <div className="w-full grid grid-cols-4  pt-5 gap-y-6  sm:px-0">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[252px]"
          >
            <Image
              src={item.image}
              className="w-full object-contain h-[222px] bg-[#EAEFFF]"
              alt="Doctors"
              priority
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
                <p className="w-2 h-2 rounded-full bg-green-500"></p>
                <p>Avaliable</p>
              </div>
              <p className="text-[#262626] text-lg font-medium">{item.name}</p>
              <p className="text-[#5C5C5C] text-sm font-light">
                {item.speciality}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Button className="bg-[#C9D8FF] text-[#4F4F4F] hover:bg-[#C9D8FF] hover:text-[#4F4F4F] border-none mt-10  rounded-full text-sm font-medium px-10 py-5 cursor-pointer">
          More
        </Button>
      </div>
    </div>
  );
}

export default TopDoctors;
