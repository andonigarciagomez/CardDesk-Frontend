import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./router/AppRouter";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 🌙 CARGAR MODO OSCURO
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  // ⏳ LOADING SCREEN
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // 🌙 TOGGLE DARK MODE
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");

    const newMode = !darkMode;
    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode);
  };

  // 🚀 LOADING BONITO
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <AuthProvider>
      <FavoritesProvider>

        {/* 🌙 BOTÓN MODO OSCURO */}
        <button
          onClick={toggleDarkMode}
          style={{
            position: "fixed",
            top: "15px",
            right: "15px",
            zIndex: 1000,
          }}
          className="btn btnGhost"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <AppRouter />

      </FavoritesProvider>
    </AuthProvider>
  );
}