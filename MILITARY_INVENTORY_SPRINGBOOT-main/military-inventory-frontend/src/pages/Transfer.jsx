import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../components/Toast';

export default function Transfers() {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [form, setForm] = useState({ equipmentType: '', quantity: '', fromBase: '', toBase: '', date: '' });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/transfers');
      setHistory(data ?? [{ id: 1, date: '2025-08-12', equipment: 'Rifles', qty: 30, fromBase: 'Base A', toBase: 'Base B' }]);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    const { equipmentType, quantity, fromBase, toBase, date } = form;
    if (!equipmentType || !quantity || !fromBase || !toBase || !date) return push('Fill all fields');
    setLoading(true);
    try {
      await api.post('/transfers', { equipmentType, quantity: +quantity, fromBase, toBase, date });
      push('Transfer recorded');
      setForm({ equipmentType: '', quantity: '', fromBase: '', toBase: '', date: '' });
      await load();
    } catch { push('Failed to save'); } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <h3 className="font-semibold mb-3 text-green-200">Transfer Assets</h3>
        <div className="grid md:grid-cols-5 gap-3">
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Equipment Type" value={form.equipmentType} onChange={(e) => setForm({ ...form, equipmentType: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="From Base" value={form.fromBase} onChange={(e) => setForm({ ...form, fromBase: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="To Base" value={form.toBase} onChange={(e) => setForm({ ...form, toBase: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <button onClick={submit} disabled={loading} className="mt-3 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 rounded-xl disabled:opacity-60">{loading ? 'Transferring…' : 'Transfer'}</button>
      </div>

      <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <h3 className="font-semibold mb-3 text-green-200">Transfer History</h3>
        <ul className="space-y-2">
          {history.map((h) => (
            <li key={h.id} className="bg-black/40 p-3 rounded-xl border border-white/10">
              {h.date} · {h.qty} {h.equipment} · {h.fromBase} → {h.toBase}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}