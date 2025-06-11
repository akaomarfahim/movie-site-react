import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PublicRoutes({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? <Navigate to="/profile" state={{ from: location }} replace /> : children;
}

export default PublicRoutes;
