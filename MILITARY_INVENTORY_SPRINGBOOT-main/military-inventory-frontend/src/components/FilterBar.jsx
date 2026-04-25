export default function FilterBar({ onChange }) {
  return (
    <div className="bg-camo-800 p-4 rounded-2xl flex flex-wrap gap-3">
      <select className="bg-camo-700 px-3 py-2 rounded-lg" onChange={e => onChange?.({ dateRange: e.target.value })}>
        <option value="30">Last 30 Days</option>
        <option value="7">Last 7 Days</option>
        <option value="all">All</option>
      </select>
      <select className="bg-camo-700 px-3 py-2 rounded-lg" onChange={e => onChange?.({ base: e.target.value })}>
        <option value="">All Bases</option>
        <option value="Base A">Base A</option>
        <option value="Base B">Base B</option>
      </select>
      <select className="bg-camo-700 px-3 py-2 rounded-lg" onChange={e => onChange?.({ type: e.target.value })}>
        <option value="">All Equipment</option>
        <option value="Weapons">Weapons</option>
        <option value="Vehicles">Vehicles</option>
        <option value="Ammunition">Ammunition</option>
      </select>
    </div>
  );
}
