import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import api from '../services/api';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const [filters, setFilters] = useState({ dateRange: '30', base: '', type: '' });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ opening: 0, closing: 0, net: 0, assigned: 0, expended: 0 });
  const [series, setSeries] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/dashboard', { params: filters });
        if (!mounted) return;
        setStats(data?.summary ?? { opening: 1200, closing: 1100, net: -100, assigned: 300, expended: 50 });
        setSeries(data?.series ?? mockSeries());
      } catch (e) {
        setStats({ opening: 1200, closing: 1100, net: -100, assigned: 300, expended: 50 });
        setSeries(mockSeries());
      } finally {
        setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [filters]);

  const netHint = useMemo(() => 'Purchases + Transfer In - Transfer Out', []);

  return (
    <div className="w-full ">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
        <FilterBar onChange={(f) => setFilters((s) => ({ ...s, ...f }))} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard title="Opening Balance" value={stats.opening} />
          <StatCard title="Closing Balance" value={stats.closing} />
          <StatCard title="Net Movement" value={stats.net} hint={netHint} onClick={() => setOpen(true)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatCard title="Assigned Assets" value={stats.assigned} />
          <StatCard title="Expended Assets" value={stats.expended} />
        </div>

        {/* Trend */}
        <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
          <div className="text-sm opacity-80 mb-2">Net Movement — last {filters.dateRange === 'all' ? 'period' : `${filters.dateRange} days`}</div>
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <AreaChart data={series} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeOpacity={0.15} vertical={false} />
                <XAxis dataKey="d" tick={{ fill: 'rgba(255,255,255,0.6)' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.6)' }} tickLine={false} axisLine={false} width={40} />
                <Tooltip contentStyle={{ background: 'rgba(23,23,23,0.95)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="net" stroke="#22c55e" fill="url(#g1)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Modal open={open} title="Net Movement Details" onClose={() => setOpen(false)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <div className="opacity-80 text-sm">Purchases</div>
              <div className="text-2xl font-bold text-green-300">+180</div>
            </div>
            <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <div className="opacity-80 text-sm">Transfer In</div>
              <div className="text-2xl font-bold text-green-300">+30</div>
            </div>
            <div className="bg-black/30 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
              <div className="opacity-80 text-sm">Transfer Out</div>
              <div className="text-2xl font-bold text-green-300">-310</div>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
}

function mockSeries() {
  const today = new Date();
  return Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (13 - i));
    return { d: `${d.getMonth()+1}/${d.getDate()}`, net: Math.round((Math.sin(i/2) * 80) + 40) };
  });
}