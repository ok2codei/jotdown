import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

interface User {
    token: string;
    name?: string;
    email?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUserProfile = async (token: string) => {
        try {
            const res = await api.get("/users/profile");
            const dbUser = res.data.data;
            
            setUser({
                token,
                name: dbUser.username,
                email: dbUser.email
            });
        } catch (error) {
            console.error("Failed to fetch profile:", error);
            const decoded: any = jwtDecode(token);
            setUser({ token, name: `User #${decoded.user_id}`, email: "Verified Account" });
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            fetchUserProfile(token).finally(() => setLoading(false));
        } else {
            delete api.defaults.headers.common["Authorization"];
            setLoading(false);
        }
    }, []);

    const login = async (token: string) => {
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        
        await fetchUserProfile(token);
    };

    const logout = () => {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};