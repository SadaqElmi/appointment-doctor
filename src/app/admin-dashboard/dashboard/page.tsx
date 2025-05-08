import React from "react";
import { assets_admin } from "@/mockdata/assentAdmin";
import { assets } from "@/mockdata/assets";
import Image from "next/image";
const Dashboard_Admin = () => {
  return (
    <>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3 mb-10">
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.doctor_icon}
              alt="Doctors"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">14</p>
            <p className="text-[#8893B0]">Doctors</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.appointments_icon}
              alt="Doctors"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">2</p>
            <p className="text-[#8893B0]">Appointment</p>
          </div>
        </div>
        <div className="aspect-video rounded-xl bg-[#FFFFFF] shadow-md flex justify-center items-center gap-2">
          <div>
            <Image
              src={assets_admin.patients_icon}
              alt="Doctors"
              priority
              className="h-16 w-16 bg-[#F6F8FF] rounded"
            />
          </div>
          <div className="flex items-start flex-col ">
            <p className="text-[#515151] font-medium">5</p>
            <p className="text-[#8893B0]">Patients</p>
          </div>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-[#FFFFFF] md:min-h-min border border-[#E6E8F0] shadow-md ">
        <div className="px-5 py-3 flex gap-2 ">
          <Image
            src={assets_admin.list_icon}
            alt="list_icon"
            className="h-6 w-6  rounded"
          />
          <p className="font-medium text-[18px]">Latest Appointment</p>
        </div>
        <hr className="mt-1" />
        <div className="flex flex-col gap-2 my-4">
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <Image
                src={assets.profile_pic}
                alt="appointments_icon"
                className="h-[52px] w-[52px]  rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[18px] font-medium">Dr. Richard James</p>
                <p className="text-[#696B80] text-[16px] font-normal">
                  Booking on 24th July, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer">
                <Image
                  src={assets_admin.cancel_icon}
                  alt="cancel_icon"
                  className="h-12 w-12  rounded"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <Image
                src={assets.profile_pic}
                alt="appointments_icon"
                className="h-[52px] w-[52px]  rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[18px] font-medium">Dr. Richard James</p>
                <p className="text-[#696B80] text-[16px] font-normal">
                  Booking on 24th July, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer">
                <Image
                  src={assets_admin.cancel_icon}
                  alt="cancel_icon"
                  className="h-12 w-12  rounded"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <Image
                src={assets.profile_pic}
                alt="appointments_icon"
                className="h-[52px] w-[52px]  rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[18px] font-medium">Dr. Richard James</p>
                <p className="text-[#696B80] text-[16px] font-normal">
                  Booking on 24th July, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer">
                <Image
                  src={assets_admin.cancel_icon}
                  alt="cancel_icon"
                  className="h-12 w-12  rounded"
                />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div className="flex items-center gap-2">
              <Image
                src={assets.profile_pic}
                alt="appointments_icon"
                className="h-[52px] w-[52px]  rounded-full"
              />
              <div className="flex flex-col">
                <p className="text-[18px] font-medium">Dr. Richard James</p>
                <p className="text-[#696B80] text-[16px] font-normal">
                  Booking on 24th July, 2024
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="cursor-pointer">
                <Image
                  src={assets_admin.cancel_icon}
                  alt="cancel_icon"
                  className="h-12 w-12  rounded"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard_Admin;
