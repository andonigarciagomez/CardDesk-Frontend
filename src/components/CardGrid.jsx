import clickSound from "../assets/click.mp3";
import { useFavorites } from "../context/FavoritesContext";

const CardGrid = ({ cards = [], onSelectCard }) => {
  const { favorites, toggleFavorite } = useFavorites();

  // 🔊 SONIDO
  const playSound = () => {
    const audio = new Audio(clickSound);
    audio.volume = 0.3;
    audio.play();
  };

  // ⭐ CHECK FAVORITO
  const isFavorite = (cardId) => {
    return favorites.some((fav) => fav.cardId === cardId);
  };

  // 🎯 EFECTO TILT
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

  // 🎨 CLASE POR SOURCE (YA LIMPIO)
  const getCollectionClass = (card) => {
    return card.source || "magic";
  };

  return (
    <div className="card-grid">
      {cards.slice(0, 24).map((card) => {
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

                toggleFavorite({
                  id: card.id,
                  name: card.name,
                  image: card.image,
                  source: card.source, // 🔥 YA NO SE CALCULA
                });
              }}
            >
              {isFavorite(card.id) ? "❤️" : "🤍"}
            </button>

            {/* 🖼️ IMAGEN */}
            <img src={card.image} alt={card.name} loading="lazy" />

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