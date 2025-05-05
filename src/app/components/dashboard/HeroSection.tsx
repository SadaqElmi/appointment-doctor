"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { assets } from "@/mockdata/assets";
const HeroSection = () => {
  return (
    <div>
      <div className=" font-bold bg-[#5f6fff] rounded-2xl ">
        <div className="flex   justify-between   text-white">
          <div className="flex flex-col items-start gap-3 justify-center w-full py-[128px] px-10">
            <h1 className="text-5xl leading-[60px] font-bold">
              Book Appointment With Trusted Doctors
            </h1>
            <div className="flex w-full items-center justify-center  gap-2 ">
              <Image
                src={assets.group_profiles}
                alt="Group Image"
                className="w-28 object-cover "
                priority
              />
              <p className=" text-sm font-light">
                Simply browse through our extensive list of trusted doctors,
                <br />
                schedule your appointment hassle-free.
              </p>
            </div>
            <Link
              href="#speciality"
              passHref
              className="flex items-center gap-2"
            >
              <Button className="bg-white hover:bg-white hover:cursor-pointer py-5 px-5 rounded-full text-black font-light ">
                Book Appointment
                <Image
                  src={assets.arrow_icon}
                  alt="Group Image"
                  className="w-3 object-cover "
                />
              </Button>
            </Link>
          </div>

          <div className="relative flex items-center justify-center w-full mt-4">
            <Image
              src={assets.header_img}
              alt="Header Image"
              className="w-full  absolute bottom-[0px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
