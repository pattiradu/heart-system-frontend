import * as React from "react";
import {
  BookOpen,
  Bot,
  CalendarCheck,
  CheckCircle2,
  Command,
  Frame,
  HeartHandshake,
  HelpingHand,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./theme/mode-toggle";

export function AppSidebar({ ...props }) {
  const data = {
    user: {
      name: "User name",
      email: "m@example.com",
      avatar: "",
    },
    navMain: [
      { title: "Dashboard", url: "/", icon: LayoutDashboard },
      { title: "Roles", url: "/roles", icon: UserCog },
      { title: "General Users", url: "/users", icon: Users },

      { title: "Doctors", url: "/doctors", icon: Stethoscope },
      { title: "Appointments", url: "/appointments", icon: CalendarCheck },
      {
        title: "Solved Appointments",
        url: "/solved-appointments",
        icon: CheckCircle2,
      },
      { title: "Account center", url: "/account-center", icon: UserCog },
      { title: "Help", url: "/help", icon: HelpingHand },
    ],
  };

  return (
    <Sidebar
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
            >
              <a href="#">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <HeartHandshake className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">HMS</span>
                  <span className="truncate text-xs">system</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />{" "}
        <p className="text-center">
          © {new Date().getFullYear()} Healthy Heart Inc.
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
