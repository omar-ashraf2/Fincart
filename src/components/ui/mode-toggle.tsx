import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isBouncing, setIsBouncing] = useState(false);
  const isDark = theme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
    setIsBouncing(true);
    setTimeout(() => setIsBouncing(false), 500);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={cn(
        "relative overflow-hidden focus:outline-none transition-transform hover:scale-110 active:scale-95",
        isBouncing && "scale-110"
      )}
    >
      <Sun
        className={cn(
          "absolute h-6 w-6 transition-all duration-500 ease-in-out",
          isDark
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        )}
      />
      <Moon
        className={cn(
          "absolute h-6 w-6 transition-all duration-500 ease-in-out",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
