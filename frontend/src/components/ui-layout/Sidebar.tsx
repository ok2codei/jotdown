import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "@/components/ui/ThemeToggle";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen border-r border-ui-border dark:border-ui-border-dark bg-ui-surface dark:bg-ui-surface-dark p-4">

      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">
          JotDown
        </h1>

        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">

        <Link
          to="/app/notes"
          className={`px-4 py-2 rounded-xl transition ${
            location.pathname === "/app/notes"
              ? "bg-brand-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          Notes
        </Link>

        <Link
          to="/app/archive"
          className={`px-4 py-2 rounded-xl transition ${
            location.pathname === "/app/archive"
              ? "bg-brand-primary text-white"
              : "hover:bg-gray-100 dark:hover:bg-zinc-800"
          }`}
        >
          Archive
        </Link>

      </nav>
    </aside>
  );
};

export default Sidebar;