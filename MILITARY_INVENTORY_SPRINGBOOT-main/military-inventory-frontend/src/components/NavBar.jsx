import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ onHamburgerClick }) {
  const { user, role, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full px-6 py-4 flex justify-between items-center bg-gradient-to-r from-black via-camo-900 to-green-700 backdrop-blur-xl border-b border-white/20 shadow-lg fixed top-0 z-50"
    >
      {/* Hamburger for mobile */}
      <button
        className="md:hidden text-green-300 text-2xl mr-4"
        onClick={onHamburgerClick}
      >
        ☰
      </button>

      {/* Branding */}
      <div className="text-green-300 font-extrabold text-xl tracking-wider">
        ⚔️ Military Command
      </div>

      {/* User Info + Logout */}
      {user && (
        <div className="flex items-center space-x-6 md:space-x-8 text-gray-300">
          <span className="font-medium">{user.name}</span>
          <span className="text-green-400">{role}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm transition"
          >
            Logout
          </button>
        </div>
      )}
    </motion.nav>
  );
}
