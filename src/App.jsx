import NavBar from "./components/NavBar";
import { MovieProvider } from "./context/MovieContext";
import { AuthProvider } from "./context/AuthContext";
import "./styles/App.css";
import "./styles/Footer.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <MovieProvider>
          <NavBar />
          <main className="main-content">
            <AppRoutes />
          </main>
          <footer className="footer">&copy; 2025 | Fazle Elahi Fahim</footer>
        </MovieProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
