//app/AdminDashboard/layout
"use client";

import { Toaster } from "react-hot-toast";
import "../globals.css";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section>
        {children}
        <Toaster />
      </section>
    </SessionProvider>
  );
}
