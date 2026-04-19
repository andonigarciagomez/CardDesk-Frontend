import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService";

const Profile = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  return (
    <div>
      <h2>Mis Favoritos ⭐</h2>

      <div className="card-grid">
        {favorites.map((card) => (
          <div key={card.card_id} className="card">
            <img src={card.image_url} alt={card.name} />
            <p>{card.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;