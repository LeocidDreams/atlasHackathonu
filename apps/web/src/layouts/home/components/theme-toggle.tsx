import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "@components/ui/button";
import { useTheme } from "@provider/theme-provider";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function handleToggle() {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className="relative overflow-hidden"
    >
      <SunIcon
        aria-hidden="true"
        className="scale-100 rotate-0 transition-all duration-500 ease-out motion-reduce:transition-none dark:scale-0 dark:-rotate-90"
      />
      <MoonIcon
        aria-hidden="true"
        className="absolute scale-0 rotate-90 transition-all duration-500 ease-out motion-reduce:transition-none dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}
