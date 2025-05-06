import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { assets } from "@/mockdata/assets";
const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center  p-4 mb-6  border-b border-black">
        <div className="logo">
          <Link href="/">
            <Image width={150} height={150} src={assets.logo} alt="Logo" />
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

        <div className="flex items-center space-x-4 cursor-pointer">
          <Button className="bg-blue-500 text-white hover:bg-[#5F6FFF] px-4 py-4 rounded-full">
            <Link href="../../singup">Create Account </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center space-x-2 border-none outline-none focus:outline-none">
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Image src={assets.dropdown_icon} alt="DropdownMenuItem" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="../../dashbord/profile" className="w-full">
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Link href="../../dashbord/my-appointments">
                    My Appointments
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
