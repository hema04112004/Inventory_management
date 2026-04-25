export default function LoadingOverlay({ show, label = 'Loading...' }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="bg-neutral-900/90 border border-white/10 px-4 py-3 rounded-xl text-sm">{label}</div>
    </div>
  );
}