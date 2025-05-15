"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
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
import Link from "next/link";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      router.push("../Login");
    } catch (error: any) {
      alert(error.response?.data?.error || "Sign up failed");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription className="mt-2">
            Please sign up to book appointment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={form.name} onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={form.email} onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#5F6FFF] hover:bg-[#5F6FFF]"
              >
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-gray-500 mt-4 w-full">
            Already have an account?{" "}
            <Link href="../Login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
