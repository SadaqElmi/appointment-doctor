//app/AdminDashboard/layout
"use client";

import { Toaster } from "react-hot-toast";
import "../globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
      <Toaster />
    </section>
  );
}
