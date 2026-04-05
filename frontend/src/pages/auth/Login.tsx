import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "@/types/auth";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";


const Login=()=>{
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

   const{
      register,
      handleSubmit,
      formState:{errors},
      setFocus,
    }= useForm<LoginFormData>();

    const {login}= useAuth();
    const navigate= useNavigate();
    const onSubmit=async (data:LoginFormData)=>{
    setLoading(true);
    setError(null);
     try{
      const res= await LoginUser(data);
      console.log("login success",res)
      login(res.token);
      navigate("/notes");
     }catch(err:any){
       setError(err.message || "Invalid email or password")
     } finally{
      setLoading(false);
     }
    };
    
    useEffect(()=>{
      setFocus("email")
    },[setFocus])

    
 return (
    <main className="flex items-center justify-center bg-gray-50">
     <section className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4">Login</h1>

       <form onSubmit={handleSubmit(onSubmit)} >
       <label htmlFor="email" className="block text-sm mb-1">Email</label>
       <input
       id="email"
       type="email"
       aria-invalid={!!errors.email} 
       { ...register("email",{
         required:"Email is required",
         pattern:{
            value: /^\S+@\S+$/,
            message:"Invalid email format",
         }
       })}
        className="w-full border rounded p-2"/>
        {errors.email && (
         <p role="alert" className="text-red-500 text-sm mb-2">
            * {errors.email.message}
         </p>
        )}

        <label htmlFor="password" className="block text-sm mb-1">Password</label>
        <input 
        id="password"
        type="password"
        aria-invalid={!!errors.password}
        { ...register( "password",{
         required: "Password is required",
         minLength:{
            value: 6,
            message:"Minimum 6 characters",
         }
        })}
        className="w-full p-2 border rounded mb-2"/>
        { errors.password && (
         <p role="alert" className="text-red-500 text-sm mb-2">
            * {errors.password.message}
         </p>
        )}
        <button
        type="submit"
        disabled={loading}
        aria-label="Login to your account"
        className="w-full bg-blue-600 text-white mt-2 p-1 border rounded">
        {loading ? "Logging in..." : "Login"}
        </button>
      </form>
     </section>
    </main>
 )
}
export default Login;