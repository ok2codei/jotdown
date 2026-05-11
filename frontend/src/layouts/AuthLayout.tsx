import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <main className="h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text--600">Jotdown</h2>
                <p className="text-gray-500">Your thoughts organized.</p>
            </div>

            <section className="w-full max-w-md p-8">
                <Outlet />
            </section>

            <footer className="mt-8 text-sm text-gray-400">
                &copy; 2026 Jotdown. All rights reserved.
            </footer>
        </main>
    );
};

export default AuthLayout;