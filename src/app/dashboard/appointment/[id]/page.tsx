"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { assets } from "@/mockdata/assets";
import toast from "react-hot-toast";

type Doctor = {
  available: boolean;
  _id: string;
  name: string;
  image: string;
  specialization: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: {
    street?: string;
    city?: string;
  };
};

const AppointmentDoctor = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentUser = session?.user;

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const doctor = doctors.find((doc) => doc._id === id);
  const relatedDoctors = doctors.filter(
    (doc) =>
      doc.specialization === doctor?.specialization && doc._id !== doctor._id
  );

  useEffect(() => {
    axios
      .get("/api/doctor")
      .then((res) => {
        if (res.data.success) {
          setDoctors(res.data.doctors);
        }
      })
      .catch((err) => console.error("Error fetching doctors", err))
      .finally(() => setLoading(false));
  }, []);

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

  const handleBookAppointment = async () => {
    if (!selectedDate) return toast.error("Please select a date");
    if (!selectedTime) return toast.error("Please select a time slot");
    if (!doctor) return;
    if (!currentUser || !currentUser.id)
      return toast.error("You must be logged in");

    const appointment = {
      userId: currentUser.id,
      docId: doctor._id,
      slotDate: selectedDate,
      slotTime: selectedTime,
      userData: {
        name: currentUser.name,
        email: currentUser.email,
      },
      docData: {
        name: doctor.name,
        specialization: doctor.specialization,
      },
      amount: doctor.fees,
      date: Date.now(),
      cancelled: 0,
      payment: false,
      isCompleted: false,
    };

    try {
      const res = await axios.post("/api/bookAppointment", appointment);
      if (res.data.success) {
        toast.success("Appointment booked successfully!");
        setSelectedDate("");
        setSelectedTime(null);
        router.push("/dashboard/my-appointments");
      } else {
        toast.error("Failed to book appointment");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      toast.error("Something went wrong");
    }
  };

  if (loading || status === "loading") return <p>Loading...</p>;
  if (!doctor) return <p>Doctor not found</p>;
  if (!session) return <p>Please log in to book an appointment.</p>;

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
        <div className="flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">
            {doctor.name}
            <Image src={assets.verified_icon} className="w-5" alt="verified" />
          </p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>
              {doctor.degree} - {doctor.specialization}
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
                setSelectedTime(null);
              }}
              className={`text-center p-4 min-w-16 rounded-full cursor-pointer border transition-colors ${
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
          <div className="mt-6">
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
              onClick={() => {
                if (!item.available) {
                  toast.success("Doctor is currently unavailable.");
                  return;
                }
                router.push(`/dashboard/appointment/${item._id}`);
              }}
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
                  {item.specialization}
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
