import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

import { BrowserRouter } from "react-router-dom";
import AppLayout from "./App";

createRoot(document.getElementById("root")).render(
  <ThemeProvider
    defaultTheme="system"
    storageKey="vite-ui-theme"
  >
    <BrowserRouter>
      <Toaster
        position="top-right"
        richColors
      />
      <AppLayout />
    </BrowserRouter>
  </ThemeProvider>
);
