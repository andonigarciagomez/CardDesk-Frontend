import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getMagicCards } from "../api/cardsApi";
import { getPokemonCards } from "../api/pokemonApi";
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
  });

  const [formValues, setFormValues] = useState({
    search: "",
    colors: "",
    rarity: "",
    types: "",
  });

  const loadCards = async (currentFilters, pageNumber, currentCollection) => {
    try {
      setLoading(true);
      setError("");

      let data = [];

      if (currentCollection === "magic") {
        data = await getMagicCards({
          ...currentFilters,
          page: pageNumber,
        });
      }

      if (currentCollection === "pokemon") {
        data = await getPokemonCards({
          search: currentFilters.search,
          page: pageNumber,
        });
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
      <div className="heroBanner card">
        <img src={bannerImg} alt="CardDesk banner" className="heroBanner__image" />
        <div className="heroBanner__overlay">
          <h1 className="heroBanner__title">CardDesk</h1>
          <p className="heroBanner__text">
            Explora, guarda y organiza tus cartas favoritas de Magic y Pokémon.
          </p>
        </div>
      </div>

      <div className="card">
        <div className="cardBody">
          <form onSubmit={handleSubmit} className="searchFilters">
            <div className="searchFilters__group">
              <label className="label">Colección</label>
              <select
                className="input"
                value={collectionType}
                onChange={(e) => {
                  setCollectionType(e.target.value);
                  setPage(1);
                }}
              >
                <option value="magic">Magic</option>
                <option value="pokemon">Pokémon</option>
              </select>
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

      <div className="homeResults">
        {loading && <p>Cargando cartas...</p>}
        {error && <p>{error}</p>}

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

      {selectedCard && (
        <div
          className="cardModalOverlay"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="cardModal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cardModalClose btn btnDanger"
              onClick={() => setSelectedCard(null)}
            >
              X
            </button>

            <div className="cardModalContent">
              <div className="cardModalImage">
                <img
                  src={selectedCard.imageUrl}
                  alt={selectedCard.name}
                />
              </div>

              <div className="cardModalInfo">
                <h3>{selectedCard.name}</h3>

                <p>
                  <strong>Set:</strong> {selectedCard.setName}
                </p>

                <p>
                  <strong>Rareza:</strong> {selectedCard.rarity}
                </p>

                <p>
                  <strong>Tipo:</strong>{" "}
                  {selectedCard.type || selectedCard.types?.join(", ")}
                </p>

                <p>
                  <strong>Texto:</strong>{" "}
                  {selectedCard.text || "Sin descripción"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}