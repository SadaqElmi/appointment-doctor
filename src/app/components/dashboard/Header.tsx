"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
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

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ArrowDown } from "lucide-react";
const HeaderDashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("../../Login");
    }
  }, [status, router]);

  if (status === "loading") return null; // or a spinner
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("../../Login");
  };
  return (
    <>
      <div className="flex justify-between items-center  p-4 mb-6  border-b border-black">
        <div className="logo">
          <Link href="../../dashboard">
            <Image
              width={150}
              height={150}
              src={assets.logo}
              alt="Logo"
              priority
            />
          </Link>
        </div>

        <div className="pages">
          <ul className="flex space-x-4 relative justify-center items-center">
            <li className=" text-sm font-medium ">
              <Link
                href="../../dashboard"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                Home
              </Link>
            </li>

            <li className=" text-sm font-medium ">
              <Link
                href="../../dashboard/doctors"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                ALL DOCTORS
              </Link>
            </li>
            <li className=" text-sm font-medium ">
              <Link
                href="../../dashboard/about"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                ABOUT
              </Link>
            </li>
            <li className=" text-sm font-medium ">
              <Link
                href="../../dashboard/contact"
                className="relative after:absolute after:left-0 after:bottom-[-5px] after:w-0 after:h-[2px] after:bg-blue-500 after:transition-all hover:after:w-full"
              >
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-4 cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-center space-x-2 border-none outline-none focus:outline-none">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src={session?.user?.image ?? undefined}
                  alt="Profile"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ArrowDown />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href="../../dashboard/profile" className="w-full">
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Link href="../../dashboard/my-appointments">
                    My Appointments
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default HeaderDashboard;
