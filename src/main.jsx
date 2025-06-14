import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme/theme-provider";

createRoot(document.getElementById("root")).render(
  <ThemeProvider
    defaultTheme="system"
    storageKey="vite-ui-theme"
  >
    {/* Sonner Toaster */}
    <Toaster
      position="top-right"
      richColors
    />
    <App />
  </ThemeProvider>
);
