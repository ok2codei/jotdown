import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui-layout/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-ui-canvas dark:bg-ui-canvas-dark text-black dark:text-white">

      <Sidebar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AppLayout;