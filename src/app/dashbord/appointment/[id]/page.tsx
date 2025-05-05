"use client";

import { useParams, useRouter } from "next/navigation";
import { doctors } from "@/mockdata/assets";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { assets } from "@/mockdata/assets";
import toast from "react-hot-toast";

const AppointmentDoctor = () => {
  const { id } = useParams();
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate dates for the next 7 days
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + i);
      return {
        date: date.toISOString().split("T")[0],
        day: date
          .toLocaleDateString("en-US", { weekday: "short" })
          .toUpperCase(),
        number: date.getDate(),
      };
    });
  }, []);

  // Available time slots
  const timeSlots = useMemo(
    () => [
      "10:30 am",
      "11:00 am",
      "11:30 am",
      "12:00 pm",
      "12:30 pm",
      "1:00 pm",
      "1:30 pm",
    ],
    []
  );

  const doctor = doctors.find((doc) => doc._id === id);
  const relatedDoctors = doctors.filter(
    (item) => item.speciality === doctor?.speciality && item._id !== doctor?._id
  );

  const handleBookAppointment = () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    if (!doctor) return;

    const appointment = {
      doctorId: doctor._id,
      doctorName: doctor.name,
      date: selectedDate,
      time: selectedTime,
      address: doctor.address,
      speciality: doctor.speciality,
      timestamp: new Date().toISOString(),
    };

    try {
      const existingAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      const updatedAppointments = [...existingAppointments, appointment];
      localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
      toast.success("Appointment booked successfully!");
      setSelectedDate("");
      setSelectedTime(null);
      router.push("/dashbord/my-appointments");
    } catch (error) {
      console.error("Failed to save appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-6">
        <div>
          <Image
            src={doctor.image}
            alt={doctor.name}
            className="bg-[#5f6fff] w-[280px] h-full sm:max-w-72 rounded-lg"
            width={280}
            height={280}
          />
        </div>
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {doctor.name}
            <Image src={assets.verified_icon} className="w-5" alt="verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {doctor.degree} - {doctor.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {doctor.experience} Years
            </button>
          </div>
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">
              About <Image src={assets.info_icon} className="w-4" alt="about" />
            </p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {doctor.about}
            </p>
          </div>
          <p className="text-gray-600 font-medium mt-4">
            Appointment fee: ${doctor.fees}
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]">
        <p>Booking slots</p>
        <div className="flex gap-3 items-center w-full mt-4 flex-wrap">
          {dates.map((d) => (
            <div
              key={d.date}
              onClick={() => {
                setSelectedDate(d.date);
                setSelectedTime(null); // Reset time when date changes
              }}
              className={`text-center  p-4 min-w-16 rounded-full cursor-pointer border transition-colors ${
                selectedDate === d.date
                  ? "bg-[#5f6fff] text-white border-[#5f6fff]"
                  : "border-[#5f6fff] hover:border-[#5f6fff]/50"
              }`}
            >
              <p className="text-sm">{d.day}</p>
              <p className="text-sm">{d.number}</p>
            </div>
          ))}
        </div>
        {selectedDate && (
          <div className="mt-6 transition-all duration-300 ease-in-out opacity-100">
            <div className="flex gap-3 flex-wrap">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-colors ${
                    selectedTime === time
                      ? "bg-[#5f6fff] text-white"
                      : "text-[#949494] bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleBookAppointment}
          className="bg-[#5f6fff] text-white text-sm font-light px-20 py-3 rounded-full my-6 cursor-pointer"
        >
          Book an appointment
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 my-16 text-[#262626]">
        <h1 className="text-3xl font-medium">Related Doctors</h1>
        <p className="sm:w-1/3 text-center text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      {relatedDoctors.length > 0 && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 gap-y-6">
          {relatedDoctors.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                router.push(`../../dashbord/appointment/${item._id}`)
              }
              className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 w-[252px]"
            >
              <Image
                src={item.image}
                className="w-full object-contain h-[222px] bg-[#EAEFFF]"
                alt="Doctor"
                priority
                width={252}
                height={222}
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-center text-green-500">
                  <p className="w-2 h-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-[#262626] text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-[#5C5C5C] text-sm font-light">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentDoctor;
