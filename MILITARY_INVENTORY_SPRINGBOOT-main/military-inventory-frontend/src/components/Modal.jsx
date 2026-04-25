export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-camo-800 w-full max-w-2xl rounded-2xl shadow-lg">
        <div className="flex items-center justify-between p-4 border-b border-camo-700">
          <h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} className="px-2 py-1 bg-camo-700 rounded-lg">Close</button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
