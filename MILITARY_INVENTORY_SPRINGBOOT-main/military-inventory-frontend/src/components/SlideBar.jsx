import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Sidebar({ open, onClose }) {
  const location = useLocation();
  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Purchases', path: '/purchases' },
    { label: 'Transfers', path: '/transfers' },
    { label: 'Assignments', path: '/assignments' },
  ];

  return (
    <motion.aside
      initial={{ x: -24, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className={`fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-black via-emerald-950 to-green-900/70 backdrop-blur-xl border-r border-white/10 p-5 flex-col space-y-2 z-40 ${open ? 'flex' : 'hidden'} md:flex`}
    >
      <div className="text-green-300 font-bold text-lg mb-2">Menu</div>
      {links.map((l) => {
        const active = location.pathname === l.path;
        return (
          <Link
            key={l.path}
            to={l.path}
            onClick={onClose}
            className={`px-4 py-2 rounded-xl transition block ${active ? 'bg-green-600/25 text-green-300 ring-1 ring-green-400/30' : 'text-gray-300 hover:bg-green-800/20 hover:text-green-200'}`}
          >
            {l.label}
          </Link>
        );
      })}
    </motion.aside>
  );
}