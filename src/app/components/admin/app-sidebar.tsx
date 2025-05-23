"use client";

import * as React from "react";
import {
  BriefcaseMedical,
  LayoutDashboard,
  List,
  PlusCircle,
  User,
  UserPlus,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate: (component: string, title: string) => void;
  activeComponent: string;
  user: {
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
}

export function AppSidebar({
  onNavigate,
  activeComponent,
  user,
  ...props
}: AppSidebarProps) {
  const navItems =
    user.role === "doctor"
      ? [
          {
            title: "Doctor Panel",
            component: "doctorPanel",
            icon: BriefcaseMedical,
          },
        ]
      : [
          { title: "Dashboard", component: "dashboard", icon: LayoutDashboard },
          {
            title: "Appointments",
            component: "appointments",
            icon: PlusCircle,
          },
          { title: "Add Doctor", component: "addDoctor", icon: UserPlus },
          { title: "Doctor Lists", component: "doctorLists", icon: List },
          { title: "Patients", component: "Patients", icon: User },
        ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain
          items={navItems}
          onNavigate={onNavigate}
          activeComponent={activeComponent}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} onNavigate={onNavigate} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
