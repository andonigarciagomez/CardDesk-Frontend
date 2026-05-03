import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function MyCards() {
  const { favorites, toggleFavorite } = useFavorites();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredCards = favorites.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" || card.source === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section className="myCardsPage">
      <h1 className="title">⭐ Mis cartas</h1>

      <input
        className="input"
        placeholder="Buscar carta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("magic")}>Magic</button>
        <button onClick={() => setFilter("pokemon")}>Pokémon</button>
        <button onClick={() => setFilter("yugioh")}>Yu-Gi-Oh</button>
      </div>

      {filteredCards.length === 0 ? (
        <p>No tienes cartas que coincidan</p>
      ) : (
        <div className="card-grid">
          {filteredCards.map((card) => (
            <div key={card.cardId} className="card">
              <button
                className="favorite-btn active"
                onClick={() => toggleFavorite({
                  id: card.cardId,
                  name: card.name,
                  image: card.image,
                  source: card.source
                })}
              >
                ❤️
              </button>

              <img src={card.image} alt={card.name} />

              <div className="card-info">
                <p>{card.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}