import axios from "axios";

const BASE_URL = "https://api.magicthegathering.io/v1/cards";

export const getMagicCards = async ({
  search = "",
  colors = "",
  rarity = "",
  types = "",
  page = 1,
} = {}) => {
  const params = {
    page,
    pageSize: 35,
  };

  if (search) params.name = search;
  if (colors) params.colors = colors;
  if (rarity) params.rarity = rarity;
  if (types) params.types = types;

  const response = await axios.get(BASE_URL, { params });

  const cards = response.data.cards || [];

  // 🔥 FILTRAMOS SOLO LAS QUE TIENEN IMAGEN
  return cards
    .filter((card) => card.imageUrl) // 👈 CLAVE
    .map((card) => ({
      id: card.id,
      name: card.name,
      image: card.imageUrl, // 👈 usa image (no imageUrl)
      setName: card.setName || "Magic",
      rarity: card.rarity || "Unknown",
      type: card.type || "",
      types: card.types || [],
      text: card.text || "",
      source: "magic",
      raw: card, // 👈 opcional pero recomendable
    }));
};