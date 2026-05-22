import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useDarkMode();

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-xl border border-ui-border dark:border-ui-border-dark hover:scale-105 transition"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;