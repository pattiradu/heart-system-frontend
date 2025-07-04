import { Laptop, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const getButtonVariant = (mode) => (theme === mode ? "default" : "outline");

  return (
    <div className="flex items-center ml-3 gap-5">
      <Button
        variant={getButtonVariant("light")}
        size="icon"
        onClick={() => setTheme("light")}
        aria-label="Set light theme"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={getButtonVariant("dark")}
        size="icon"
        onClick={() => setTheme("dark")}
        aria-label="Set dark theme"
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      </Button>
      <Button
        variant={getButtonVariant("system")}
        size="icon"
        onClick={() => setTheme("system")}
        aria-label="Set system theme"
      >
        <Laptop />
      </Button>
    </div>
  );
}
