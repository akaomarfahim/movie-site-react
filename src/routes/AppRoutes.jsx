import { Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/home";
import FavoritesScreen from "../pages/favorites";
import MovieDetailsScreen from "../pages/MovieDetails";
import ProfileScreen from "../pages/Profile";
import LoginScreen from "../pages/Login";
import NotFoundScreen from "./NotFound"; // 404 page

// Route guards
import ProtectedRoute from "../routes/ProtectedRoutes";
import PublicRoutes from "../routes/PublicRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<FavoritesScreen />} />
      <Route path="/details/:id" element={<MovieDetailsScreen />} />

      <Route
        path="/login"
        element={
          <PublicRoutes>
            <LoginScreen />
          </PublicRoutes>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
}
