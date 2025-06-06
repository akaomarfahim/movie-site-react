import { Routes, Route } from "react-router-dom";
import "./css/App.css";
import "./css/Footer.css";
import Home from "./pages/home";
import FavoritesScreen from "./pages/favorites";
// import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import MovieDetailsScreen from "./pages/MovieDetails";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="app-container">
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<FavoritesScreen />} />
            <Route path="/details/:id" element={<MovieDetailsScreen />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <footer className="footer">&copy; 2025 | Fazle Elahi Fahim</footer>
      </MovieProvider>
    </div>
  );
}

export default App;

{
  /* <footer className="bg-dark text-white text-center py-3">&copy; 2025 | Fazle Elahi Fahim</footer>;

<div>
  <NavBar />
  <main className="main-content">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/favorites" element={<Favorites />} />
    </Routes>
  </main>
  <footer className="bg-dark text-white text-center py-3">&copy; 2025 | Fazle Elahi Fahim</footer>;
</div>; */
}
