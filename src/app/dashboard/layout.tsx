//app/dashboard/layout
"use client";
import { Toaster } from "react-hot-toast";
import "../globals.css";
import HeaderDashboard from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section>
        <HeaderDashboard />
        {children}
        <Toaster />
        <Footer />
      </section>
    </SessionProvider>
  );
}
