import { createContext, useContext, useEffect, useMemo, useState } from "react";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (cardId) => {
    return favorites.some((card) => card.id === cardId);
  };

  const addFavorite = (card) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === card.id)) return prev;
      return [...prev, card];
    });
  };

  const removeFavorite = (cardId) => {
    setFavorites((prev) => prev.filter((card) => card.id !== cardId));
  };

  const toggleFavorite = (card) => {
    if (isFavorite(card.id)) {
      removeFavorite(card.id);
    } else {
      addFavorite(card);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value = useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      clearFavorites,
    }),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  }

  return context;
}