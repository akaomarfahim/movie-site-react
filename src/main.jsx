import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/Index.css";
import App from "./App.jsx";
// Add this line:
import { inject } from "@vercel/analytics";

inject();

// RFCE
// npm create vite@latest movie-app --template react

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
