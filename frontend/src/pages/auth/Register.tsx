import { useState } from 'react';
import type { RegisterFormData } from "../../types/auth";
import { RegisterUser } from '@/services/authService';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; 

const Register = () => {
    const[loading, setLoading]= useState(false);
    const[serverError, setServerError]= useState(null);
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        defaultValues: {
            username: "",
            email: "",
            password: ""
        }
    });
    
    const navigate= useNavigate();
    const onSubmit = async (data: RegisterFormData) => {
        try{
            setLoading(true);
            setServerError(null);
            await RegisterUser(data);
            navigate("/auth/login");
        }catch(err:any){
            setServerError(err.message || "Registration failed")
        }finally{
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col items-center justify-center bg-gray-100">
            <section className="bg-white p-8 rounded-lg shadow-md w-96">

                { serverError && <p role="alert" className='bg-red-100 text-red-700 text-sm p-2 mb-2 rounded-sm'>{serverError}</p>}
                <h1 className="text-2xl font-bold mb-6">Create Account</h1>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* REGISTER NAME */}

                           
                        <label className="block text-sm ">Name</label>
                        <input 
                        id="name"
                        type="text"
                            {...register("username", { required: "Name is required" })} 
                            className="w-full border p-2 rounded"
                        />
                        {errors.username && <p className="text-red-500 text-sm mb-2">* {errors.username.message}</p>}
                            {/* EMAIL */}
                            <label htmlFor="email" className="block text-sm mb-1">Email</label>
                             <input
                            id="email"
                            type="email"
                            aria-invalid={ !!errors.email} 
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

                            {/* PASSWORD */}

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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                    {loading ? "Registering..." : "Register"}
                    </button>
                </form>
            </section>
        </main>
    );
};

export default Register;