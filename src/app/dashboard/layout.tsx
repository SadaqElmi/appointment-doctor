//app/dashboard/layout
import { Toaster } from "react-hot-toast";
import "../globals.css";
import HeaderDashboard from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <HeaderDashboard />
      {children}
      <Toaster />
      <Footer />
    </section>
  );
}
