import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout" ;
import AppLayout from "../layouts/AppLayout.tsx";

import Login from "../pages/auth/Login.tsx";
import  Register  from "../pages/auth/Register.tsx";
import { Notes } from "../pages/app/Notes.tsx";

import ProtectedRoute from "./ProtectedRoute.tsx";

const router = createBrowserRouter([
    // {
    //     path : "*",
    //     element: <h1>phewwww</h1>
    // },
    {
        path : "/",
        element: <Navigate to="/app/notes" />
    },
    {
        path: "/auth",
        element : <AuthLayout />,
        children: [
            {path: "login" , element: <Login />},
            {path: "register" , element: <Register />}
        ],
    },

    {
        path: "/app",
        element: (  
        <ProtectedRoute>   
             <AppLayout /> 
        </ProtectedRoute>
        ),
        children: [
      {
        path: "notes",
        element: <Notes />,
      },
    ],
    },
]) ;


export default router;