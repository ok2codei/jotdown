import { Link } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle';
const Navbar=()=>{
     return (
        <>
        {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">

        <Link to="/">
          <h1 className="text-2xl font-bold">
            JotDown
          </h1>
        </Link>

        <div className="flex items-center gap-4">

          <ThemeToggle />

          <Link to="/auth/login">
            <button className="px-4 py-2 rounded-xl bg-brand-primary text-white">
              Login
            </button>
          </Link>

          <Link to="/auth/register">
            <button className="px-4 py-2 rounded-xl bg-brand-primary text-white">
              Signup
            </button>
          </Link>

        </div>
      </nav></>
     )
}

export default Navbar;