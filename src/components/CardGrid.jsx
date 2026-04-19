import { useEffect, useState } from "react";
import clickSound from "../assets/click.mp3";
import {
  getFavorites,
  addFavorite,
  deleteFavorite,
} from "../services/favoriteService";

const CardGrid = ({ cards = [], onSelectCard }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await getFavorites();
      setFavorites(data);
    } catch (error) {
      console.error("Error cargando favoritos", error);
    }
  };

  // 🔊 SONIDO
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.3;
    audio.play();
  };

  // ⭐ CHECK FAVORITO
  const isFavorite = (cardId) => {
    return favorites.some((fav) => fav.card_id === cardId);
  };

  // ⚡ FAVORITOS INSTANTÁNEOS
  const handleToggleFavorite = async (card) => {
    const alreadyFav = isFavorite(card.id);

    setFavorites((prev) =>
      alreadyFav
        ? prev.filter((f) => f.card_id !== card.id)
        : [...prev, { card_id: card.id }]
    );

    try {
      if (alreadyFav) {
        await deleteFavorite(card.id);
      } else {
        await addFavorite({
          id: card.id,
          name: card.name,
          image: card.image,
        });
      }
    } catch (error) {
      console.error("Error toggle favorito", error);
      loadFavorites(); // rollback
    }
  };

  // 🔥 EFECTO 3D TILT
  const handleMouseMove = (e, el) => {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y / rect.height - 0.5) * 12;
    const rotateY = (x / rect.width - 0.5) * 12;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const resetTilt = (el) => {
    if (!el) return;
    el.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  // 🎨 CLASE POR COLECCIÓN
  const getCollectionClass = (card) => {
    if (card.raw?.card_images) return "yugioh"; // Yu-Gi-Oh
    if (card.raw?.types) return "pokemon"; // Pokémon
    return "magic"; // Magic
  };

  return (
    <div className="card-grid">
      {cards.map((card) => {
        const isHolo =
          card.raw?.rarity === "Rare" ||
          card.raw?.rarity === "Mythic Rare";

        const collectionClass = getCollectionClass(card);

        return (
          <div
            key={card.id}
            className={`card ${isHolo ? "holo" : ""} ${collectionClass}`}
            ref={(el) => (card._el = el)}
            onMouseMove={(e) => handleMouseMove(e, card._el)}
            onMouseLeave={() => resetTilt(card._el)}
            onClick={() => {
              playSound();
              onSelectCard && onSelectCard(card);
            }}
          >
            {/* ⭐ FAVORITO */}
            <button
              className={`favorite-btn ${
                isFavorite(card.id) ? "active" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(card);
              }}
            >
              {isFavorite(card.id) ? "❤️" : "🤍"}
            </button>

            {/* 🖼️ IMAGEN */}
            <img
              src={card.image}
              alt={card.name}
              loading="lazy"
            />

            {/* 📝 INFO */}
            <div className="card-info">
              <p>{card.name}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardGrid;