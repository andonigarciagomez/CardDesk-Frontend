import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getMagicCards } from "../api/cardsApi";
import { getPokemonCards } from "../api/pokemonApi";
import { getYugiohCards } from "../api/yugiohApi";
import bannerImg from "../assets/carddesk-banner.png";

export default function Home() {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);

  const [collectionType, setCollectionType] = useState("magic");

  const [filters, setFilters] = useState({
  search: "",
  colors: "",
  rarity: "",
  types: "",
  yugiohType: "",
  yugiohAttribute: "",
});

const [formValues, setFormValues] = useState({
  search: "",
  colors: "",
  rarity: "",
  types: "",
  yugiohType: "",
  yugiohAttribute: "",
});

  const normalizeCards = (data) => {
  return data
    .map((card) => ({
      id: card.id,
      name: card.name,
      image:
        card.imageUrl ||
        card.images?.small ||
        card.card_images?.[0]?.image_url || // 🔥 YuGiOh
        null,
      raw: card,
    }))
    .filter((card) => card.image);
};

  const loadCards = async (currentFilters, pageNumber, currentCollection) => {
    try {
      setLoading(true);
      setError("");

      let data = [];

      if (currentCollection === "all") {
        const [magic, pokemon, yugioh] = await Promise.all([
          getMagicCards({ ...currentFilters, page: pageNumber }),
          getPokemonCards({ search: currentFilters.search, page: pageNumber }),
          getYugiohCards({ search: currentFilters.search, page: pageNumber }),
        ]);

        data = normalizeCards([
          ...magic,
          ...pokemon,
          ...yugioh,
        ]);
      }

      if (currentCollection === "magic") {
        const res = await getMagicCards({
          ...currentFilters,
          page: pageNumber,
        });

        data = normalizeCards(res);
      }

      if (currentCollection === "pokemon") {
        const res = await getPokemonCards({
          search: currentFilters.search,
          page: pageNumber,
        });

        data = normalizeCards(res);
      }

      if (currentCollection === "yugioh") {
        let res = await getYugiohCards({
          search: currentFilters.search,
          page: pageNumber,
        });

        // 🔥 FILTROS PRO
        if (currentFilters.yugiohType) {
          res = res.filter((c) =>
            c.type?.toLowerCase().includes(
              currentFilters.yugiohType.toLowerCase()
            )
          );
        }

        if (currentFilters.yugiohAttribute) {
          res = res.filter(
            (c) => c.attribute === currentFilters.yugiohAttribute
          );
        }

        data = normalizeCards(res);
      }

      setCards(data);
    } catch (err) {
      console.error(err);
      setError("No se pudieron cargar cartas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCards(filters, page, collectionType);
  }, [filters, page, collectionType]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(formValues);
    setPage(1);
  };

  const handleReset = () => {
    const emptyFilters = {
      search: "",
      colors: "",
      rarity: "",
      types: "",
    };

    setFormValues(emptyFilters);
    setFilters(emptyFilters);
    setPage(1);
  };

  return (
    <section className="homePage">

      {/* 🔥 HERO MEJORADO */}
      <div className="heroBanner card">
        <img
          src={bannerImg}
          alt="CardDesk banner"
          className="heroBanner__image"
        />
        <div className="heroBanner__overlay">
          <h1 className="heroBanner__title">CardDesk</h1>
          <p className="heroBanner__text">
            Explora, guarda y organiza tus cartas favoritas
          </p>
        </div>
      </div>

      {/* 🔍 FILTROS */}
      <div className="card">
        <div className="cardBody">
          <form onSubmit={handleSubmit} className="searchFilters">

            <div className="searchFilters__group">
              <label className="label">Colección</label>
              <div className="tabs">
                <button
                  className={`tab ${collectionType === "magic" ? "active" : ""}`}
                  onClick={() => {
                    setCollectionType("magic");
                    setPage(1);
                  }}
                >
                  🧙 Magic
                </button>

                <button
                  className={`tab ${collectionType === "pokemon" ? "active" : ""}`}
                  onClick={() => {
                    setCollectionType("pokemon");
                    setPage(1);
                  }}
                >
                  ⚡ Pokémon
                </button>

                <button
                  className={`tab ${collectionType === "yugioh" ? "active" : ""}`}
                  onClick={() => {
                    setCollectionType("yugioh");
                    setPage(1);
                  }}
                >
                  🐉 Yu-Gi-Oh
                </button>

                <button
                  className={`tab ${collectionType === "all" ? "active" : ""}`}
                  onClick={() => {
                    setCollectionType("all");
                    setPage(1);
                  }}
                >
                  🌍 Explorar
                </button>
              </div>
            </div>

            <div className="searchFilters__group searchFilters__group--full">
              <label className="label">Nombre</label>
              <input
                name="search"
                className="input"
                value={formValues.search}
                onChange={handleChange}
                placeholder="Buscar carta..."
              />
            </div>

            {collectionType === "magic" && (
              <>
                <div className="searchFilters__group">
                  <label className="label">Color</label>
                  <select
                    name="colors"
                    className="input"
                    value={formValues.colors}
                    onChange={handleChange}
                  >
                    <option value="">Todos</option>
                    <option value="White">White</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                  </select>
                </div>

                <div className="searchFilters__group">
                  <label className="label">Rareza</label>
                  <select
                    name="rarity"
                    className="input"
                    value={formValues.rarity}
                    onChange={handleChange}
                  >
                    <option value="">Todas</option>
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Mythic Rare">Mythic</option>
                  </select>
                </div>

                <div className="searchFilters__group">
                  <label className="label">Tipo</label>
                  <select
                    name="types"
                    className="input"
                    value={formValues.types}
                    onChange={handleChange}
                  >
                    <option value="">Todos</option>
                    <option value="Creature">Creature</option>
                    <option value="Instant">Instant</option>
                    <option value="Sorcery">Sorcery</option>
                    <option value="Artifact">Artifact</option>
                    <option value="Enchantment">Enchantment</option>
                    <option value="Planeswalker">Planeswalker</option>
                  </select>
                </div>
              </>
            )}

            {collectionType === "yugioh" && (
            <>
              <div className="searchFilters__group">
                <label>Tipo</label>
                <select
                  name="yugiohType"
                  value={formValues.yugiohType}
                  onChange={handleChange}
                >
                  <option value="">Todos</option>
                  <option value="Monster">Monster</option>
                  <option value="Spell">Spell</option>
                  <option value="Trap">Trap</option>
                </select>
              </div>

              <div className="searchFilters__group">
                <label>Atributo</label>
                <select
                  name="yugiohAttribute"
                  value={formValues.yugiohAttribute}
                  onChange={handleChange}
                >
                  <option value="">Todos</option>
                  <option value="LIGHT">LIGHT</option>
                  <option value="DARK">DARK</option>
                  <option value="EARTH">EARTH</option>
                  <option value="WATER">WATER</option>
                  <option value="FIRE">FIRE</option>
                  <option value="WIND">WIND</option>
                </select>
              </div>
            </>
          )}

            <div className="searchFilters__actions">
              <button className="btn btnPrimary">Buscar</button>

              <button
                type="button"
                className="btn btnGhost"
                onClick={handleReset}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 📊 RESULTADOS */}
      <div className="homeResults pageTransition">

        {/* 🔥 SKELETON PRO */}
        {loading && (
          <div className="skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        )}

        {/* ❌ ERROR */}
        {!loading && error && <p>{error}</p>}

        {/* ✅ CARTAS */}
        {!loading && !error && cards.length > 0 && (
          <>
            <CardGrid cards={cards} onSelectCard={setSelectedCard} />

            <div className="pagination">
              <button
                className="btn btnGhost"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                ← Anterior
              </button>

              <span className="paginationPage">Página {page}</span>

              <button
                className="btn btnPrimary"
                onClick={() => setPage(page + 1)}
              >
                Siguiente →
              </button>
            </div>
          </>
        )}

        {!loading && !error && cards.length === 0 && (
          <p>No se encontraron cartas</p>
        )}
      </div>

      {/* 🧠 MODAL */}
      {selectedCard && (
        <div
          className="cardModalOverlay fadePage"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="cardModal animateModal glowModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cardModalClose"
              onClick={() => setSelectedCard(null)}
            >
              ✕
            </button>

            <div className="cardModalContent">

              {/* IMAGEN */}
              <div className="cardModalImage">
                <img
                  src={selectedCard.image}
                  alt={selectedCard.name}
                />
              </div>

              {/* INFO */}
              <div className="cardModalInfo">
                <h2>{selectedCard.name}</h2>

                <div className="cardMeta">
                  <p><strong>Set:</strong> {selectedCard.raw?.setName || "N/A"}</p>
                  <p><strong>Rareza:</strong> {selectedCard.raw?.rarity || "N/A"}</p>
                  <p><strong>Tipo:</strong> {selectedCard.raw?.type || selectedCard.raw?.types?.join(", ") || "N/A"}</p>
                </div>

                <p className="cardText">
                  {selectedCard.raw?.text || "Sin descripción"}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}