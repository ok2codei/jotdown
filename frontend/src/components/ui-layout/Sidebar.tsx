import { Link, useLocation } from "react-router-dom";
import { useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const handleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  return (
    /* 1. We use a template string for className. 
      2. If isOpen is true: width is w-1/4, padding is p-4.
      3. If isOpen is false: width collapses to w-16 (just enough for the button) and layout adjusts!
    */
    <aside className={`min-h-screen border-r border-ui-border dark:border-ui-border-dark bg-ui-surface dark:bg-ui-surface-dark p-4 transition-all duration-300 flex flex-col ${
      isOpen ? "w-1/4" : "w-16 items-center"
    }`}>

      {/* Header containing your smart toggle button */}
      <div className={`flex items-center mb-8 w-full ${isOpen ? "justify-between" : "justify-center"}`}>
        
        {/* Only show the brand name if the sidebar is expanded */}
        {isOpen && <h1 className="text-xl font-bold">JotDown</h1>}
        
        {/* Your smart button switches between X and ☰ */}
        <button 
          onClick={handleSidebar} 
          className="hover:text-brand-primary transition font-bold text-xl p-1"
        >
          {!isOpen ? "☰" : "X"}
        </button>
      </div>

      {/* Navigation Links: Only render them if the sidebar is open */}
      {isOpen && (
        <nav className="flex flex-col gap-2 w-full">
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
      )}
    </aside>
  );
};

export default Sidebar;