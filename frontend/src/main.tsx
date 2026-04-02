
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthContext.tsx'
import { RouterProvider } from "react-router-dom";
import router  from "./routes/router";


createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <RouterProvider router={router} />
  </AuthProvider>,
)
