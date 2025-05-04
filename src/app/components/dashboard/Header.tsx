import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/../public/assets_frontend/logo.svg";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center  p-4 mb-6  border-b border-black">
        <div className="logo">
          <Link href="/">
            <Image width={150} height={150} src={Logo} alt="Logo" />
          </Link>
        </div>

        <div className="pages">
          <ul className="flex space-x-4 relative justify-center items-center">
            <li className=" text-sm font-medium ">
              <Link
                href="/"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>

            <li className=" text-sm font-medium ">
              <Link
                href="../../dashbord/doctors"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                ALL DOCTORS
              </Link>
            </li>
            <li className=" text-sm font-medium ">
              <Link
                href="../../dashbord/about"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                ABOUT
              </Link>
            </li>
            <li className=" text-sm font-medium ">
              <Link
                href="../../dashbord/contact"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-4 rounded-full">
          <Link href="/">Create Account </Link>
        </Button>
      </div>
    </>
  );
};

export default Header;
