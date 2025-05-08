"use client";

import * as React from "react";
import { BookOpen, Bot, SquareTerminal } from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { assets } from "@/mockdata/assets";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: assets.profile_pic.src,
  },
  navMain: [
    {
      title: "Dashboard",
      component: "dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Appointments",
      component: "appointments",
      icon: Bot,
    },
    {
      title: "Doctor Panel",
      component: "doctorPanel",
      icon: BookOpen,
    },
    {
      title: "Add Doctor",
      component: "addDoctor",
      icon: BookOpen,
    },
    {
      title: "Doctor Lists",
      component: "doctorLists",
      icon: BookOpen,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  onNavigate: (component: string, title: string) => void;
  activeComponent: string;
}

export function AppSidebar({
  onNavigate,
  activeComponent,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          onNavigate={onNavigate}
          activeComponent={activeComponent}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
