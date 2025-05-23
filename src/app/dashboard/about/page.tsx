import Image from "next/image";
import React from "react";
import { assets } from "@/mockdata/assets";

const About = () => {
  return (
    <>
      <div>
        <div className="text-center text-2xl pt-10 text-[#707070]">
          <p className="text-3xl font-light mb-4 text-gray-300">
            About <span className="text-black font-bold">US</span>
          </p>
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-12">
          <div>
            <Image
              src={assets.about_image}
              alt="About-image"
              className="w-full md:max-w-[360px]"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
            <p>
              Welcome to Appointment Doctor, your trusted partner in managing
              your healthcare needs conveniently and efficiently. At Prescripto,
              we understand the challenges individuals face when it comes to
              scheduling doctor appointments and managing their health records.
            </p>
            <p>
              Appointment Doctor is committed to excellence in healthcare
              technology. We continuously strive to enhance our platform,
              integrating the latest advancements to improve user experience and
              deliver superior service. Whether you are booking your first
              appointment or managing ongoing care, Appointment Doctor is here
              to support you every step of the way.
            </p>
            <b>Our Vision</b>
            <p>
              Our vision at Prescripto is to create a seamless healthcare
              experience for every user. We aim to bridge the gap between
              patients and healthcare providers, making it easier for you to
              access the care you need, when you need it.
            </p>
          </div>
        </div>
        <div className="text-xl my-4">
          <p>
            WHY <span className="text-black font-bold"> CHOOSE US</span>
          </p>
        </div>
        <div className="flex flex-col md:flex-row mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <p>EFFICIENCY:</p>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <p>CONVENIENCE:</p>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
            <p>PERSONALIZATION:</p>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
