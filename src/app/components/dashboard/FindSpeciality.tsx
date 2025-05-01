import Image from "next/image";
import React from "react";
import Generalphysician from "@/../public/assets_frontend/General_physician.svg";
import Gynecologist from "@/../public/assets_frontend/Gynecologist.svg";
import Dermatologist from "@/../public/assets_frontend/Dermatologist.svg";
import Pediatricians from "@/../public/assets_frontend/Pediatricians.svg";
import Neurologist from "@/../public/assets_frontend/Neurologist.svg";
import Gastroenterologist from "@/../public/assets_frontend/Gastroenterologist.svg";
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
          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Generalphysician}
              alt="doctors"
              className="w-16 sm:w-24 mb-2 transition duration-300"
              priority
            />
            <p className="text-sm font-light">General Physician</p>
          </div>

          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Gynecologist}
              alt="doctors"
              className="w-16 sm:w-24 mb-2 transition duration-300"
              priority
            />
            <p className="text-sm font-light">Gynecologist</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Dermatologist}
              alt="doctors"
              className="w-16 sm:w-24 mb-2"
              priority
            />
            <p className="text-sm font-light">Dermatologist</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Pediatricians}
              alt="doctors"
              className="w-16 sm:w-24 mb-2 transition duration-300"
              priority
            />
            <p className="text-sm font-light">Pediatricians</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Neurologist}
              alt="doctors"
              className="w-16 sm:w-24 mb-2 transition duration-300"
              priority
            />
            <p className="text-sm font-light">Neurologist</p>
          </div>
          <div className="flex flex-col justify-center items-center hover:translate-y-[-10px] transition-all duration-500 cursor-pointer">
            <Image
              src={Gastroenterologist}
              alt="doctors"
              className="w-16 sm:w-24 mb-2 transition duration-300"
              priority
            />
            <p className="text-sm font-light">Gastroenterologist</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FindSpeciality;
