import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import Purchases from '../pages/Purchases';
import Transfers from '../pages/Transfer';
import Assignments from '../pages/Assignments';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Shell from './Shell';

function Protected({ allow, children }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (allow && !allow.includes(role)) return <Navigate to="/" replace />;

  return children; // ✅ directly render the page
}

export const router = createBrowserRouter([
  {
    element: <Shell />,
    children: [
      { path: '/dashboard', element: <Protected allow={['ADMIN','LOGISTICS','COMMANDER']}><Dashboard /></Protected> },
      { path: '/purchases', element: <Protected allow={['ADMIN','LOGISTICS']}><Purchases /></Protected> },
      { path: '/transfers', element: <Protected allow={['ADMIN','LOGISTICS','COMMANDER']}><Transfers /></Protected> },
      { path: '/assignments', element: <Protected allow={['ADMIN','COMMANDER']}><Assignments /></Protected> }
    ]
  },
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> }
]);
