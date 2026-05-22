import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui-layout/Navbar";

const MarketingLayout = () => {
  return (
    <div className="min-h-screen bg-ui-canvas dark:bg-ui-canvas-dark text-black dark:text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MarketingLayout;