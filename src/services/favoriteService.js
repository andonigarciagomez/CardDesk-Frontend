import axios from "axios";

const API = "http://localhost:3000/api/favorites";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getFavorites = async () => {
  const res = await axios.get(API, getAuthConfig());
  return res.data;
};

export const addFavorite = async (card) => {
  const res = await axios.post(
    API,
    {
      card_id: card.id,
      name: card.name,
      image_url: card.image,
    },
    getAuthConfig()
  );
  return res.data;
};

export const deleteFavorite = async (cardId) => {
  await axios.delete(`${API}/${cardId}`, getAuthConfig());
};