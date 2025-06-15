// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCog,
  User,
  Stethoscope,
  CalendarCheck,
  CheckCircle2,
  HeartPulse,
  HelpingHand,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./theme/mode-toggle";

const menu = [
  {
    items: [{ label: "Dashboard", to: "/", icon: LayoutDashboard }],
  },
  {
    heading: "User Management",
    items: [
      { label: "Roles", to: "/roles", icon: UserCog },
      { label: "General Users", to: "/users", icon: Users },
    ],
  },
  {
    heading: "Doctors & Visits",
    items: [
      { label: "Doctors", to: "/doctors", icon: Stethoscope },
      { label: "Appointments", to: "/appointments", icon: CalendarCheck },
      {
        label: "Solved Appointments",
        to: "/solved-appointments",
        icon: CheckCircle2,
      },
    ],
  },
  {
    heading: "Setting",
    items: [
      { label: "Account center", to: "/account-center", icon: UserCog },
      { label: "Help", to: "/help", icon: HelpingHand },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r dark:border-gray-700">
      <ScrollArea className="h-screen p-4">
        <nav className="flex flex-col gap-6">
          {menu.map(({ heading, items }) => (
            <div
              key={heading ?? "root"}
              className="space-y-2"
            >
              {heading && (
                <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {heading}
                </p>
              )}
              <div className="space-y-1">
                {items.map(({ label, to, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sky-700 text-white"
                          : "text-muted-foreground hover:bg-sky-100 hover:text-sky-700"
                      )
                    }
                  >
                    {Icon && (
                      <Icon
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    )}
                    {label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="mt-4"></div>
        <ModeToggle />
      </ScrollArea>
    </aside>
  );
}
