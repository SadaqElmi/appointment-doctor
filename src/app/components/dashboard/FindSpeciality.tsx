import Image from "next/image";
import React from "react";
import { specialityData } from "@/mockdata/assets";
function FindSpeciality() {
  return (
    <>
      <div className="flex flex-col items-center justify-center py-16 mb-16 ">
        <div className="flex flex-col gap-3 justify-center items-center w-2/4">
          <h1 className="  text-3xl font-medium">Find by Speciality</h1>
          <p className="text-lg  font-extralight text-center">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <div className="flex justify-center items-center w-full gap-3 mt-10">
          <div className="flex  justify-center items-center  cursor-pointer gap-2">
            {specialityData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer"
              >
                <Image
                  src={item.image}
                  alt={item.speciality}
                  className="w-16 sm:w-24 mb-2 transition duration-300"
                  priority
                />
                <p className="text-sm font-light text-center">
                  {item.speciality}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FindSpeciality;
