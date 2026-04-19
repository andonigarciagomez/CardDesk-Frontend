import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./router/AppRouter";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");

    if (savedMode === "true") {
      document.body.classList.add("dark");
      setDarkMode(true);
    }

    const timer1 = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    const timer2 = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");

    const newMode = !darkMode;
    setDarkMode(newMode);

    localStorage.setItem("darkMode", newMode);
  };

  if (showSplash) {
    return <SplashScreen fadeOut={fadeOut} />;
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