"use client";
import { assets } from "@/mockdata/assets";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

const Profile = () => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    phone: "0619316187",
    address: "Somalia\nMogadishu",
    gender: "Male",
    birthday: "2003-01-01",
    image: assets.profile_pic,
  });

  const handleChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      <div className="relative w-36">
        <Image
          className="rounded w-36 h-36 object-cover border border-gray-300"
          src={session?.user?.image || ""}
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
                className="h-8 w-8 text-white"
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

      <p className="font-medium text-3xl text-[#262626] mt-4">SadaqElmi</p>
      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p>Email id:</p>
          <p className="text-[#5F6FFF]">sadaq@gmail.com</p>

          <p>Phone:</p>
          {isEditing ? (
            <input
              className="border px-2 py-1 rounded"
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            <p className="text-[#5F6FFF]">{profile.phone}</p>
          )}

          <p>Address:</p>
          {isEditing ? (
            <textarea
              className="border px-2 py-1 rounded"
              value={profile.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          ) : (
            <p>{profile.address}</p>
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
              value={profile.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p>{profile.gender}</p>
          )}

          <p>Birthday:</p>
          {isEditing ? (
            <input
              type="date"
              className="border px-2 py-1 rounded"
              value={profile.birthday}
              onChange={(e) => handleChange("birthday", e.target.value)}
            />
          ) : (
            <p>{profile.birthday}</p>
          )}
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
