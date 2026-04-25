import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const nav = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ batch_number: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form); // posts to /api/auth/Login
      nav("/dashboard");
    } catch (e) {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-camo-900 to-green-900 relative overflow-hidden">
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      {/* Glow Effect */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-700/30 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-camo-600/30 blur-3xl"></div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={submit}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/10 p-8 rounded-3xl shadow-2xl border border-white/20 space-y-6"
      >
        {/* Branding */}
        <h2 className="text-3xl font-extrabold text-center text-green-300 tracking-wider">
          ⚔️ Military Command Access
        </h2>
        <p className="text-center text-gray-300 text-sm">
          Authorized personnel only
        </p>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-600 focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400 transition"
            placeholder="Batch Number"
            value={form.batch_number}
            onChange={(e) =>
              setForm({ ...form, batch_number: e.target.value })
            }
          />
          <input
            type="password"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-gray-600 focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400 transition"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold tracking-wide shadow-lg transition disabled:opacity-50"
        >
          {loading ? "Authorizing…" : "Login"}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <div className="h-px w-full bg-gray-700"></div>
          <span className="px-3 text-gray-400 text-sm">or</span>
          <div className="h-px w-full bg-gray-700"></div>
        </div>

        {/* Register */}
        <div className="text-center text-gray-400 text-sm">
          No account?{" "}
          <Link
            to="/register"
            className="text-green-400 hover:underline font-medium"
          >
            Register Now
          </Link>
        </div>
      </motion.form>
    </div>
  );
}
