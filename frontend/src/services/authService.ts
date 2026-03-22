import type { LoginFormData,AuthResponse } from "../types/auth";

const API_URL= import.meta.env.VITE_API_URL;

export const LoginUser= async(data: LoginFormData
) : Promise<AuthResponse> =>{
    const res= await fetch(`${API_URL}/login`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data),
    })

    if(!res.ok){
        throw new Error("Invalid credentials");
    }
    return res.json();
};

