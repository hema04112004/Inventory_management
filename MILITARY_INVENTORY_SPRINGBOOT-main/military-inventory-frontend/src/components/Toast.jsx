import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg) => {
    const t = { id: crypto.randomUUID(), msg };
    setToasts((s) => [...s, t]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== t.id)), 2500);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="bg-neutral-900/90 border border-white/10 px-4 py-2 rounded-lg shadow">{t.msg}</div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}