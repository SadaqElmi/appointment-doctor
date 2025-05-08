"use client";

import React, { useState } from "react";
import Image from "next/image";
import { assets_admin } from "@/mockdata/assentAdmin";
import { assets } from "@/mockdata/assets";

const AddDoctor = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium"> Add Doctor </p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh]  overflow-y-auto">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="id-img">
            <Image
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={assets.profile_pic || image}
              alt="Profile"
              width={144}
              height={144}
              priority
            />
            <input
              type="file"
              id="id-img"
              hidden
              onChange={handleImageChange}
            />
          </label>
          <p>
            Upload doctor <br />
            picute{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-600">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Your Name</p>
              <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Name"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                type="email"
                className="border rounded px-3 py-2"
                placeholder="Email"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Set Password</p>
              <input
                type="password"
                className="border rounded px-3 py-2"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Experience</p>
              <select className="border rounded px-2 py-2">
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i}>{i + 1} Year</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p>Fees</p>
              <input
                type="number"
                className="border rounded px-3 py-2"
                placeholder="Doctor Fees"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Speciality</p>
              <select className="border rounded px-2 py-2">
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <p>Degree</p>
              <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Degree"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Address</p>
              <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Address1"
              />
              <input
                type="text"
                className="border rounded px-3 py-2"
                placeholder="Address2"
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            placeholder="write about doctor"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full"
        >
          Add doctor
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;
