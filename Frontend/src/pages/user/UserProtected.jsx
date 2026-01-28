import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth.jsx";

const UserProtectedRoute = ({children}) => {
  const { isAuthenticated, user, loading,role } = useAuth();

  // While checking auth (important to avoid flicker)
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <p className="text-emerald-400 font-semibold animate-pulse">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Not logged in → login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (role !== "user") {
    return <Navigate to="/unauthorized" replace />;
  }

  // Authenticated + correct role
  return children;
};

export default UserProtectedRoute;
