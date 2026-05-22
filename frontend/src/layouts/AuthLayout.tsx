import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui-layout/Navbar";

const AuthLayout = () => {
  return (
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col items-center justify-center bg-ui-canvas dark:bg-ui-canvas-dark p-4 transition-colors duration-300">

      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-brand-primary">
          JotDown
        </h2>

        <p className="text-gray-500 dark:text-gray-400">
          Your thoughts organized.
        </p>
      </div>

      <section className="w-full max-w-md p-8 rounded-2xl bg-ui-surface dark:bg-ui-surface-dark border border-ui-border dark:border-ui-border-dark shadow-lg">
      
        <Outlet />
      </section>

      <footer className="mt-8 text-sm text-gray-400 dark:text-gray-500">
        &copy; 2026 JotDown. All rights reserved.
      </footer>

    </main>
    </>
  );
};

export default AuthLayout;