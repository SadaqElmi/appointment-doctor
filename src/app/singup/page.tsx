"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SingUp = () => {
  return (
    <div className="flex justify-center items-center ">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription className="mt-2">
            Please sign up to book appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" placeholder="" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between w-full">
          <Button className="w-full bg-[#5F6FFF] hover:bg-[#5F6FFF]">
            Create Account
          </Button>
        </CardFooter>
        <div>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <a href="../Login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SingUp;
