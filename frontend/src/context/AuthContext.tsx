import { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";


interface User {
    token: string;
    name? : string;
    email? : string;
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
    const [loading, setLoading] = useState<boolean>(true); // Start as true!

    const handleUserSession = (token: string): User => {
        try {
            // Unpacks the token payload
            const decoded: any = jwtDecode(token); 
            
            return {
                token,
                // Check whatever key your backend uses (e.g., decoded.name, decoded.username)
                name: decoded.name || decoded.username || "User", 
                email: decoded.email
            };
        } catch (error) {
            console.error("Failed to decode token", error);
            return { token, name: "User" };
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
         const sessionUser = handleUserSession(token) ;
         setUser(sessionUser);   
        }else {
            // Clean up header if no token is found
            delete api.defaults.headers.common["Authorization"];
        }
        setLoading(false);
    }, [])

    const login = (token: string) => {
        localStorage.setItem("token", token);
        setUser(handleUserSession(token))
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}