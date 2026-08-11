import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/ui/Button.tsx";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <aside className={`min-h-screen border-r border-ui-border dark:border-ui-border-dark bg-ui-surface dark:bg-ui-surface-dark p-4 transition-all duration-300 flex flex-col justify-between 
      ${isOpen ? "w-1/4" : "w-16 items-center"}`}>

      {/* 🎯 Wrapper to keep Header and Nav grouped tightly at the top */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* Header Section */}
        <div className={`flex items-center w-full ${isOpen ? "justify-between" : "justify-center"}`}>
          {isOpen && <h1 className="text-xl font-bold">JotDown</h1>}
          <button
            onClick={handleSidebar}
            className="hover:text-brand-primary transition font-bold text-xl p-1"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {!isOpen ? "☰" : "X"}
          </button>
        </div>

        {/* Navigation Links */}
        {isOpen && (
          <nav className="flex flex-col gap-2 w-full">
            <Link
              to="/app/notes"
              className={`px-4 py-2 rounded-xl transition ${location.pathname === "/app/notes"
                  ? "bg-brand-primary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
            >
              Notes
            </Link>

            <Link
              to="/app/archive"
              className={`px-4 py-2 rounded-xl transition ${location.pathname === "/app/archive"
                  ? "bg-brand-primary text-white"
                  : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                }`}
            >
              Archive
            </Link>
          </nav>
        )}
      </div>

      <Button 
        onClick={handleLogout} 
        className={`w-full transition-all ${!isOpen ? "p-2 text-center" : ""}`}
      >
        {isOpen ? "Log out" : "👋"} {/* Shows an icon/emoji when collapsed instead of breaking layout */}
      </Button>
    </aside>
  );
};

export default Sidebar;