"use client";

import { AppSidebar } from "@/app/components/admin/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Dashboard_Admin from "./dashboard/page";
import Appointments from "./appointments/page";
import DoctorPanel from "./doctorPanel/page";
import AddDoctor from "./addDoctor/page";
import DoctorLists from "./doctorLists/page";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Patients from "./Patients/page";
import Profile from "./profile/page";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [activeTitle, setActiveTitle] = useState("Dashboard");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/Login");
    }

    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") return null;

  const handleNavigate = (component: string, title: string) => {
    setActiveComponent(component);
    setActiveTitle(title);
  };

  return (
    <SidebarProvider>
      <AppSidebar
        onNavigate={handleNavigate}
        activeComponent={activeComponent}
        user={{
          name: session?.user?.name || "No name",
          email: session?.user?.email || "No email",
          avatar: session?.user?.image || "No Image",
        }}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="../admin-dashboard">
                    AdminDashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{activeTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-col gap-4 p-2 pt-0">
          {activeComponent === "dashboard" && <Dashboard_Admin />}
          {activeComponent === "appointments" && <Appointments />}
          {activeComponent === "doctorPanel" && <DoctorPanel />}
          {activeComponent === "addDoctor" && <AddDoctor />}
          {activeComponent === "doctorLists" && <DoctorLists />}
          {activeComponent === "Patients" && <Patients />}
          {activeComponent === "profile" && <Profile />}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
