"use client";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideIcon } from "lucide-react";

export function NavMain({
  items,
  onNavigate,
  activeComponent,
}: {
  items: {
    title: string;
    component: string;
    icon?: LucideIcon;
  }[];
  onNavigate: (component: string, title: string) => void;
  activeComponent: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="font-black text-sm text-black mb-3">
        Admin Dashboard Panel
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild>
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => onNavigate(item.component, item.title)}
                  className={`${
                    item.component === activeComponent
                      ? "bg-[#f2f3ff] border-r-5 border-[#5f6fff] pb-2 p-8 text-[#515151] "
                      : "pb-2 p-8"
                  }`}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
