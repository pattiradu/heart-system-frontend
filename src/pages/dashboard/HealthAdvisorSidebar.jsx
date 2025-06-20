import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HealthAdvisorSidebar() {
  const location = useLocation();
  const menu = [
    { name: "Dashboard", path: "/dashboard/health-advisor" },
    { name: "Patients", path: "/dashboard/health-advisor/patients" },
    { name: "Reports", path: "/dashboard/health-advisor/reports" },
  ];
  return (
    <aside className="w-56 min-h-screen bg-gray-100 border-r p-4">
      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded hover:bg-blue-100 font-medium ${location.pathname === item.path ? "bg-blue-600 text-white" : "text-gray-700"}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 