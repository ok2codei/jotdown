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
            console.log("Decoded JWT payload:", decoded)
            return {
                token,
                // Check whatever key your backend uses (e.g., decoded.name, decoded.username)
                name: `User #${decoded.user_id}`, 
                email: "Verified Account"
            };
        } catch (error) {
            console.error("Failed to decode token", error);
            return { token, name: "User" };
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            // 1. Set the authorization header immediately so the API call works
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            
            try {
                api.get("/users/profile")
                    .then((res) => {
                       // 1. Extract the nested database row cleanly
                    const dbUser = res.data.data; 

                    setUser({
                        token,
                        name: dbUser.username,
                        email: dbUser.email
                    });
                })
                .catch((err) => {
                    console.error("Failed to fetch user profile data:", err);
                    // Fallback safety net
                    const decoded: any = jwtDecode(token);
                    setUser({ token, name: `User #${decoded.user_id}`, email: "Verified Account" });
                })
                .finally(() => {
                    setLoading(false);
                });
                    
            } catch (error) {
                console.error("Invalid token found in storage:", error);
                logout();
                setLoading(false);
            }
        } else {
            // No token found at all
            delete api.defaults.headers.common["Authorization"];
            setLoading(false); // 5. Stop loading immediately so they can view the login page
        }
    }, []);

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