import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { LoginFormData } from "../../types/auth";


const Login=()=>{
   const{
      register,
      handleSubmit,
      formState:{errors},
      setFocus,
    }= useForm<LoginFormData>();

    const onSubmit=(data:LoginFormData)=>{
      console.log("Form Data:", data)
    };
    
    useEffect(()=>{
      setFocus("email")
    },[setFocus])

    
 return (
    <main className="h-screen flex items-center justify-center bg-gray-50">
     <section className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-xl font-semibold mb-4">Login</h1>

       <form onSubmit={handleSubmit(onSubmit)} >
       <label htmlFor="email" className="block text-sm mb-1">Email</label>
       <input
       id="email"
       type="email"
       aria-invalid={!errors.email} 
       { ...register("email",{
         required:"Email is required",
         pattern:{
            value: /^\S+@\S+$/i,
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
        aria-invalid={!errors.password}
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
        aria-label="Login to your account"
        className="w-full bg-blue-600 text-white mt-2 p-1 border rounded">
        Login
        </button>
      </form>
     </section>
    </main>
 )
}
export default Login;