import axios from "axios";

const API = "http://localhost:3000/api/favorites";

const getAuth = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getFavorites = async () => {
  const res = await axios.get(API, getAuth());
  return res.data;
};

export const addFavorite = async (card) => {
  const res = await axios.post(API, card, getAuth());
  return res.data;
};

export const deleteFavorite = async (id) => {
  await axios.delete(`${API}/${id}`, getAuth());
};