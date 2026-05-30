import { Link, useLocation } from "react-router-dom";
import { useState } from 'react'

const Sidebar = () => {
  const location = useLocation();
  const[isOpen, setIsOpen]=useState(true);

  const handleSidebar=()=>{
   setIsOpen(prev=> !prev)
  }
  if (!isOpen) {
    // You could also add a small floating button here to open it back up!
    return <button onClick={handleSidebar} className=" font-bold">☰</button>;
  }

  return (
    <aside className="aboslute w-1/4 min-h-screen border-r border-ui-border dark:border-ui-border-dark bg-ui-surface dark:bg-ui-surface-dark p-4">

      {/* Logo */}
      <div className="flex items-center justify-between mb-8">
  
        <button onClick={handleSidebar} className="hover:text-red-500 transition font-bold "> X </button>
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