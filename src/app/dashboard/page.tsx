"use client";
import { useSession } from "next-auth/react";
import BookAppointment from "../components/dashboard/Book";
import FindSpeciality from "../components/dashboard/FindSpeciality";
import HeroSection from "../components/dashboard/HeroSection";
import TopDoctors from "../components/dashboard/TopDoctors";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("../Login");
    }

    // Optional: role-based redirect
    if (status === "authenticated" && session?.user?.role !== "user") {
      router.replace("/unauthorized"); // or "/"
    }
  }, [status, session, router]);

  if (status === "loading") return null; // or a spinner

  if (status === "unauthenticated") return null;
  return (
    <>
      <HeroSection />

      <div id="speciality">
        <FindSpeciality />
      </div>
      <TopDoctors />
      <BookAppointment />
    </>
  );
};

export default Dashboard;
