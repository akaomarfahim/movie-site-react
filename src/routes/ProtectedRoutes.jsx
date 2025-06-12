import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Redirect to login page with return url
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoutes;
