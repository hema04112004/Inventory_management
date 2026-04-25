import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../components/Toast';

export default function Assignments() {
  const { push } = useToast();
  const [form, setForm] = useState({ equipmentType: '', quantity: '', personnelId: '', action: 'Assign', date: '' });
  const [items, setItems] = useState([]);

  const load = async () => {
    try {
      const { data } = await api.get('/assignments');
      setItems(data ?? [{ id: 1, text: 'Assigned 10 Helmets to P-0321' }]);
    } catch { /* noop */ }
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    const { equipmentType, quantity, personnelId, action, date } = form;
    if (!equipmentType || !quantity || !personnelId || !date) return push('Fill all fields');
    try {
      await api.post('/assignments', { equipmentType, quantity: +quantity, personnelId, action, date });
      push('Recorded');
      setForm({ equipmentType: '', quantity: '', personnelId: '', action: 'Assign', date: '' });
      await load();
    } catch { push('Failed to save'); }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="backdrop-blur-2xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-green-300 tracking-wide mb-4">🎯 Assign / Expend</h3>
        <div className="grid md:grid-cols-5 gap-4">
          <input className="bg-black/40 border border-gray-600 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400" placeholder="Equipment Type" value={form.equipmentType} onChange={(e) => setForm({ ...form, equipmentType: e.target.value })} />
          <input className="bg-black/40 border border-gray-600 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400" placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input className="bg-black/40 border border-gray-600 px-4 py-3 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400" placeholder="Personnel ID" value={form.personnelId} onChange={(e) => setForm({ ...form, personnelId: e.target.value })} />
          <select className="bg-black/40 border border-gray-600 px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-green-400" value={form.action} onChange={(e) => setForm({ ...form, action: e.target.value })}>
            <option>Assign</option>
            <option>Expend</option>
          </select>
          <input className="bg-black/40 border border-gray-600 px-4 py-3 rounded-xl text-white focus:ring-2 focus:ring-green-400" placeholder="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <button onClick={submit} className="mt-5 w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold rounded-xl shadow-lg">Record</button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="backdrop-blur-2xl bg-white/10 border border-white/20 p-6 rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold text-green-300 tracking-wide mb-4">📜 Recent Activity</h3>
        <div className="space-y-3">
          {items.map((x) => (
            <div key={x.id} className="bg-black/40 border border-gray-700 p-4 rounded-xl text-white">{x.text}</div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}