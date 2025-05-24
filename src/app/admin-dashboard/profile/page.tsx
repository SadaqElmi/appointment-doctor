"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  image: string;
  phone?: string;
  gender?: string;
  dob?: string;
  address?: {
    line1?: string;
    line2?: string;
  };
};

const Profile = () => {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);

  const user = session?.user as UserProfile;

  const [form, setForm] = useState({
    id: user?.id || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address1: user?.address?.line1 || "",
    address2: user?.address?.line2 || "",
    imageFile: null as File | null,
    previewImage: user?.image || "",
  });

  const calculateAge = (dob: string) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "";
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return isNaN(age) ? "" : age.toString();
  };

  const handleChange = (field: string, value: string | File | null) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("imageFile", file);
      const previewUrl = URL.createObjectURL(file);
      handleChange("previewImage", previewUrl);
    }
  };

  const handleSave = async () => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        data.append(key, value);
      }
    });

    const res = await axios.put("/api/profile", data);

    if (res?.status === 200) {
      toast.success("Profile updated!");
      await update();
      setIsEditing(false);
    } else {
      toast.error(res?.data?.message || "Update failed");
    }
  };

  const toggleEdit = () => {
    if (isEditing) handleSave();
    else setIsEditing(true);
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      <div className="relative w-36">
        <Image
          className="rounded w-36 h-36 object-cover border border-gray-300"
          src={form.previewImage || session?.user?.image || "/profile_pic.png"}
          alt="Profile"
          width={144}
          height={144}
          priority
        />

        {isEditing && (
          <div className="absolute bottom-0 left-0 bg-black/50 w-full text-center text-xs py-1 rounded-b">
            <label className="cursor-pointer text-blue-600 hover:underline flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      <p className="font-medium text-3xl text-[#262626] mt-4">{user?.name}</p>
      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p>Email:</p>
          <p className="text-[#5F6FFF]">{user?.email}</p>

          <p>Phone:</p>
          {isEditing ? (
            <input
              className="border px-2 py-1 rounded"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <p className="text-[#5F6FFF]">{form.phone}</p>
          )}

          <p>Address:</p>
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <input
                className="border px-2 py-1 rounded"
                placeholder="Line 1"
                value={form.address1}
                onChange={(e) => handleChange("address1", e.target.value)}
              />
              <input
                className="border px-2 py-1 rounded"
                placeholder="Line 2"
                value={form.address2}
                onChange={(e) => handleChange("address2", e.target.value)}
              />
            </div>
          ) : (
            <p>
              {form.address1}
              {form.address2 ? `, ${form.address2}` : ""}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p>Gender:</p>
          {isEditing ? (
            <select
              className="border px-2 py-1 rounded"
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{form.gender}</p>
          )}

          <p>Birthday:</p>
          {isEditing ? (
            <input
              type="date"
              className="border px-2 py-1 rounded"
              value={form.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
            />
          ) : (
            <p>{form.dob}</p>
          )}

          <p>Age:</p>
          <p>{calculateAge(form.dob)}</p>
        </div>
      </div>

      <div className="mt-10">
        <button
          className="border border-[#5F6FFF] px-8 py-2 rounded-full hover:bg-[#5F6FFF] hover:text-white transition-all"
          onClick={toggleEdit}
        >
          {isEditing ? "Save Information" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
