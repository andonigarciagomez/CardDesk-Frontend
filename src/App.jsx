import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import AppRouter from "./router/AppRouter";
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
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

  if (showSplash) {
    return <SplashScreen fadeOut={fadeOut} />;
  }

  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRouter />
      </FavoritesProvider>
    </AuthProvider>
  );
}