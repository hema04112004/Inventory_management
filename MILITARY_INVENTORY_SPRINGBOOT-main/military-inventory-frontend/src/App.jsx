import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes';
import AuthProvider from './context/AuthContext';
import { ToastProvider } from './components/Toast';

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AuthProvider>
  );
}