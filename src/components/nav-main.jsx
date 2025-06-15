"use client";

import { cn } from "@/lib/utils"; // ShadCN's classnames utility
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";

export function NavMain({ items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menus</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            {/* NavLink wraps the whole button for proper styling */}
            <NavLink
              to={item.url}
              className={({ isActive }) =>
                cn(
                  "flex items-center my-1 rounded-md w-full transition-colors",
                  isActive
                    ? "bg-muted text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted/50"
                )
              }
            >
              <SidebarMenuButton asChild>
                <div className="flex items-center gap-2 w-full">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </div>
              </SidebarMenuButton>
            </NavLink>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
