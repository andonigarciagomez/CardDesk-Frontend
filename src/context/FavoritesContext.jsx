import { createContext, useContext, useEffect, useState } from "react";
import { getFavorites, addFavorite, deleteFavorite } from "../services/favoriteService";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (token) loadFavorites();
  }, [token]);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFavorite = async (card) => {
    const exists = favorites.some(f => f.cardId === card.id);

    setFavorites(prev =>
      exists
        ? prev.filter(f => f.cardId !== card.id)
        : [...prev, { ...card, cardId: card.id }]
    );

    try {
      exists ? await deleteFavorite(card.id) : await addFavorite(card);
    } catch {
      loadFavorites();
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);