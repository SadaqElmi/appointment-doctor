import Image from "next/image";
import React from "react";
import Doc1 from "@/../public/assets_frontend/doc1.png";
import Doc2 from "@/../public/assets_frontend/doc2.png";
import Doc3 from "@/../public/assets_frontend/doc3.png";
import Doc4 from "@/../public/assets_frontend/doc4.png";
import Doc5 from "@/../public/assets_frontend/doc5.png";
import Doc6 from "@/../public/assets_frontend/doc6.png";
import Doc7 from "@/../public/assets_frontend/doc7.png";
import Doc8 from "@/../public/assets_frontend/doc8.png";
import Doc9 from "@/../public/assets_frontend/doc9.png";
import Doc10 from "@/../public/assets_frontend/doc10.png";
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
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc1}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Richard James
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">
              General physician
            </p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc2}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Emily Larson
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Gynecologist</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc3}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Sarah Patel
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Dermatologist</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc4}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Christopher Lee
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Pediatricians</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc5}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Jennifer Garcia
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Neurologist</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc6}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Andrew Williams
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">
              Gastroenterologist
            </p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc7}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Christopher Davis
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">
              General physician
            </p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc8}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Timothy White
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Gynecologist</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc9}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Ava Mitchell
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Dermatologist</p>
          </div>
        </div>
        <div className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[222px]">
          <Image
            src={Doc10}
            className="w-[222px] h-[222px] bg-[#EAEFFF]"
            alt="Doctors"
            priority
          />
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-center text-green-500 ">
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
              <p>Avaliable</p>
            </div>
            <p className="text-[#262626] text-lg font-medium">
              Dr. Jeffery King
            </p>
            <p className="text-[#5C5C5C] text-sm font-light">Pediatricians</p>
          </div>
        </div>
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
