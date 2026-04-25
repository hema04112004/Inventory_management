import { motion } from 'framer-motion';

export default function StatCard({ title, value, hint, onClick }) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      className={`bg-black/30 backdrop-blur-xl p-5 rounded-2xl border border-white/10 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="text-sm opacity-70">{title}</div>
      <div className="text-3xl font-extrabold text-green-300 mt-1">{value}</div>
      {hint && <div className="text-xs opacity-60 mt-1">{hint}</div>}
    </motion.div>
  );
}