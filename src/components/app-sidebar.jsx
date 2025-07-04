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
  const [userData, setUserData] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  console.log(userData);

  // userData.role.role_name;

  const data = {
    user: {
      name: userData.names,
      email: userData.email,
      avatar: "",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        isVisible: true,
      },
      {
        title: "Roles",
        url: "/roles",
        icon: UserCog,
        isVisible: userData.role.role_name == "Admin",
      },
      {
        title: "General Users",
        url: "/users",
        icon: Users,
        isVisible: userData.role.role_name == "Admin",
      },

      {
        title: "Doctors",
        url: "/doctors",
        icon: Stethoscope,
        isVisible: userData.role.role_name == "Doctor",
      },
      {
        title: "Appointments",
        url: "/appointments",
        icon: CalendarCheck,
        isVisible: userData.role.role_name == "Doctor",
      },
      {
        title: "Solved Appointments",
        url: "/solved-appointments",
        icon: CheckCircle2,
        isVisible: userData.role.role_name == "Doctor",
      },
      {
        title: "Account center",
        url: "/account-center",
        icon: UserCog,
        isVisible: true,
      },
      { title: "Help", url: "/help", icon: HelpingHand, isVisible: true },
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
              <a href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <HeartHandshake className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium uppercase">
                    {userData.role.role_name}
                  </span>
                  <span className="truncate text-xs uppercase">
                    {userData.names}
                  </span>
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
