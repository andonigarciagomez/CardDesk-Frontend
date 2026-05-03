import axios from "axios";

const API = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export const getYugiohCards = async ({ 
  search = "", 
  type = "", 
  attribute = "", 
  level = "", 
  race = "",
  page = 1 
}) => {
  try {
    const params = {};

    // Parámetros oficiales de la API de YGOPRODeck
    if (search) params.fname = search;
    if (type) params.type = type;
    if (attribute) params.attribute = attribute;
    if (level) params.level = level;
    if (race) params.race = race;

    const res = await axios.get(API, { params });

    // Paginación manual ya que la API devuelve todo de golpe
    const start = (page - 1) * 30;
    const end = start + 30;
    const cards = res.data.data.slice(start, end);

    return cards.map((card) => ({
      id: card.id,
      name: card.name,
      imageUrl: card.card_images?.[0]?.image_url || "",
      setName: card.card_sets?.[0]?.set_name || "Yu-Gi-Oh",
      rarity: card.card_sets?.[0]?.set_rarity || "Common",
      type: card.type || "",
      attribute: card.attribute || "",
      level: card.level || "",
      race: card.race || "",
      text: card.desc || "",
      source: "yugioh",
    }));
    
  } catch (error) {
    console.error("Error YuGiOh API", error);
    return [];
  }
};