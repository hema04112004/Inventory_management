import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:'', batch_number:'', password:'', role:'LOGISTICS' });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Registered! Please log in.');
      nav('/login');
    } catch (e) {
      alert('Registration failed (maybe user exists)');
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-black via-camo-900 to-green-900 relative overflow-hidden px-4">
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-green-700/30 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-camo-600/30 blur-3xl"></div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={submit}
        className="relative z-10 w-full max-w-md bg-camo-800/60 backdrop-blur-2xl p-6 rounded-3xl shadow-2xl border border-white/20 space-y-4"
      >
        <h2 className="text-2xl font-bold text-green-300 text-center">Register</h2>
        <input className="w-full bg-camo-700/60 backdrop-blur-md px-3 py-2 rounded-xl placeholder-gray-400 text-white focus:ring-2 focus:ring-green-400" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="w-full bg-camo-700/60 backdrop-blur-md px-3 py-2 rounded-xl placeholder-gray-400 text-white focus:ring-2 focus:ring-green-400" placeholder="Batch Number" value={form.batch_number} onChange={e=>setForm({...form,batch_number:e.target.value})}/>
        <input className="w-full bg-camo-700/60 backdrop-blur-md px-3 py-2 rounded-xl placeholder-gray-400 text-white focus:ring-2 focus:ring-green-400" placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <select className="w-full bg-camo-700/60 backdrop-blur-md px-3 py-2 rounded-xl placeholder-gray-400 text-white focus:ring-2 focus:ring-green-400" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
          
          <option value="COMMANDER">Base Commander</option>
          <option value="LOGISTICS">Logistics Officer</option>
          <option value="TROOP">Troop</option>
        </select>
        <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-2 rounded-xl shadow-lg">Create Account</motion.button>
      </motion.form>
    </div>
  );
}
