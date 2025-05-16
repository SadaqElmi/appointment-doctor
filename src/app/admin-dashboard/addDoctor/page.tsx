"use client";

import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { assets } from "@/mockdata/assets";

const AddDoctor = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    experience: "1",
    fees: "",
    specialization: "General physician",
    degree: "",
    address1: "",
    address2: "",
    about: "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      if (imageFile) formData.append("image", imageFile);

      Object.entries(formValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const res = await axios.post("/api/createDoctor", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Doctor added successfully!");
    } catch (error: any) {
      alert("Failed to add doctor: " + error.message);
    }
  };

  return (
    <div className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-auto"
      >
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="id-img">
            <Image
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={imagePreview || assets.profile_pic}
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
          <p>Upload doctor picture</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-gray-600">
          <div className="flex flex-col gap-4">
            <InputField
              label="Your Name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
            />
            <InputField
              label="Doctor Email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
            <InputField
              label="Set Password"
              name="password"
              type="password"
              value={formValues.password}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1">
              <p>Experience</p>
              <select
                name="experience"
                value={formValues.experience}
                onChange={handleChange}
                className="border rounded px-2 py-2"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i}>{i + 1} Year</option>
                ))}
              </select>
            </div>
            <InputField
              label="Fees"
              name="fees"
              type="number"
              value={formValues.fees}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name="specialization"
                value={formValues.specialization}
                onChange={handleChange}
                className="border rounded px-2 py-2"
              >
                <option>General physician</option>
                <option>Gynecologist</option>
                <option>Dermatologist</option>
                <option>Pediatrician</option>
                <option>Neurologist</option>
                <option>Gastroenterologist</option>
              </select>
            </div>
            <InputField
              label="Degree"
              name="degree"
              value={formValues.degree}
              onChange={handleChange}
            />
            <InputField
              label="Address"
              name="address1"
              value={formValues.address1}
              onChange={handleChange}
            />
            <InputField
              label=""
              name="address2"
              value={formValues.address2}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            name="about"
            value={formValues.about}
            onChange={handleChange}
            className="w-full px-4 pt-2 border rounded"
            rows={5}
            placeholder="Write about doctor"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#5f6fff] px-10 py-3 mt-4 text-white rounded-full"
        >
          Add doctor
        </button>
      </form>
    </div>
  );
};

// Reusable input field component
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="flex flex-col gap-1">
    {label && <p>{label}</p>}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="border rounded px-3 py-2"
      placeholder={label}
      required
    />
  </div>
);

export default AddDoctor;
