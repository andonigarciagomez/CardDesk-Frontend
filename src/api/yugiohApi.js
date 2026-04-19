import axios from "axios";

const API = "https://db.ygoprodeck.com/api/v7/cardinfo.php";

export const getYugiohCards = async ({ search = "", page = 1 }) => {
  try {
    const params = {};

    if (search) {
      params.fname = search; // búsqueda por nombre
    }

    const res = await axios.get(API, { params });

    // ⚠️ API no tiene paginación → simulamos
    const start = (page - 1) * 20;
    const end = start + 20;

    return res.data.data.slice(start, end);
  } catch (error) {
    console.error("Error YuGiOh API", error);
    return [];
  }
};