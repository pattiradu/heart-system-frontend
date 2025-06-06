import React from "react";
import { BrowserRouter } from "react-router-dom";
import { toast } from "sonner";
import AppRoutes from "./routes/routes";
import Sidebar from "./components/Sidebar";
import { ModeToggle } from "./components/theme/mode-toggle";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="bg-sky-700  px-10 py-4 shadow-md">
          <h1 className="text-xl font-semibold">Hypertension Dashboard</h1>
        </header>

        {/* Body */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="w-64  border-r border-gray-200">
            <Sidebar />
          </aside>

          {/* Main */}
          <main className="flex-1  p-8">
            <AppRoutes />
          </main>
        </div>

        {/* Footer */}
        <footer className=" text-center text-sm py-3">
          © {new Date().getFullYear()} Healthy Heart Inc.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
