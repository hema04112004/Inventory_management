import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useToast } from '../components/Toast';

export default function Purchases() {
  const { push } = useToast();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ equipmentType: '', quantity: '', base: '', date: '' });

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/purchases');
      setItems(data ?? [{ id: 1, date: '2025-08-01', equipment: 'Rifles', qty: 120, base: 'Base A' }]);
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!form.equipmentType || !form.quantity || !form.base || !form.date) return push('Fill all fields');
    setLoading(true);
    try {
      await api.post('/purchases', { equipmentType: form.equipmentType, quantity: +form.quantity, base: form.base, date: form.date });
      push('Purchase recorded');
      setForm({ equipmentType: '', quantity: '', base: '', date: '' });
      await load();
    } catch { push('Failed to save'); } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
      <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <h3 className="font-semibold mb-3 text-green-200">Record Purchase</h3>
        <div className="grid md:grid-cols-4 gap-3">
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Equipment Type" value={form.equipmentType} onChange={(e) => setForm({ ...form, equipmentType: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Quantity" type="number" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Base" value={form.base} onChange={(e) => setForm({ ...form, base: e.target.value })} />
          <input className="bg-black/40 px-3 py-2 rounded-lg" placeholder="Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        </div>
        <button onClick={submit} disabled={loading} className="mt-3 px-4 py-2 bg-gradient-to-r from-green-600 to-green-500 rounded-xl disabled:opacity-60">{loading ? 'Saving…' : 'Save'}</button>
      </div>

      <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
        <h3 className="font-semibold mb-3 text-green-200">History</h3>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="opacity-70 text-left">
              <tr>
                <th className="py-2">Date</th><th>Equipment</th><th>Qty</th><th>Base</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t border-white/10">
                  <td className="py-2">{r.date}</td><td>{r.equipment}</td><td>{r.qty}</td><td>{r.base}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}