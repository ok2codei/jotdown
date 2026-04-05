import { createContext, useState, useEffect } from "react";
import api from "../services/api";

interface User{
    token: string;
}

interface AuthContextType{
    user: User| null;
    login: (token: string)=> void;
    logout: ()=> void;
}

export const AuthContext =createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode})=>{
const [user,setUser]= useState<User | null>(null);

useEffect(()=>{
    const token = localStorage.getItem("token");
    if(token) setUser({token});
},[])

const login=(token: string)=>{
    localStorage.setItem("token", token);
    setUser({token})
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const logout = ()=>{
    localStorage.removeItem("token");
    setUser(null);
};

return (
    <AuthContext.Provider value={{user, login, logout}}>
        {children}
    </AuthContext.Provider>
)
}