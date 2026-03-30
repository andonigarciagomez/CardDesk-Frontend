import { useFavorites } from "../context/FavoritesContext";

// 🎨 CLASE POR TIPO (Pokemon)
function getTypeClass(card) {
  if (card.source !== "pokemon") return "";

  const type = card.types?.[0]?.toLowerCase();

  if (!type) return "";

  return `type-${type}`;
}

// ⭐ CLASE POR RAREZA
function getRarityClass(card) {
  const r = card.rarity?.toLowerCase();

  if (r?.includes("mythic")) return "rarity-mythic";
  if (r?.includes("rare")) return "rarity-rare";
  if (r?.includes("uncommon")) return "rarity-uncommon";

  return "rarity-common";
}

export default function CardGrid({ cards = [], onSelectCard }) {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <section className="cardsGrid">
      {cards.map((card) => {
        const isFavorite = favorites.some((f) => f.id === card.id);

        return (
          <article
            key={card.id}
            className={`cardItem ${getTypeClass(card)} ${getRarityClass(card)}`}
          >
            <div className="cardInner">

              {/* ✨ BRILLO */}
              <div className="cardShine"></div>

              {/* FRONT */}
              <div
                className="cardFront"
                onClick={() => onSelectCard && onSelectCard(card)}
              >
                <img src={card.imageUrl} alt={card.name} />

                <div className="cardInfo">
                  <h4>{card.name}</h4>

                  <span className="badge">
                    {card.source === "pokemon" ? "Pokémon" : "Magic"}
                  </span>
                </div>
              </div>

              {/* BACK */}
              <div className="cardBack">
                <div className="cardBackContent">
                  <h4>{card.name}</h4>

                  <p>
                    <strong>Tipo:</strong>{" "}
                    {card.type || card.types?.join(", ")}
                  </p>

                  <p>
                    <strong>Rareza:</strong> {card.rarity}
                  </p>

                  <p className="cardText">
                    {card.text || "Sin descripción"}
                  </p>

                  <button
                    className="btn btnPrimary"
                    onClick={() => toggleFavorite(card)}
                  >
                    {isFavorite ? "💔 Quitar" : "⭐ Favorito"}
                  </button>
                </div>
              </div>

            </div>
          </article>
        );
      })}
    </section>
  );
}