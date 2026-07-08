import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-neutral-900 text-white">
                <p className="text-sm font-medium animate-pulse">Verifying session...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    //Session verified, render the protected application content
    return <>{children}</>;
};

export default ProtectedRoute;