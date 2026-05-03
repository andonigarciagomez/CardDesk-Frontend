import { useEffect, useState } from "react";
import CardGrid from "../components/CardGrid";
import { getMagicCards } from "../api/cardsApi";
import { getPokemonCards } from "../api/pokemonApi";
import { getYugiohCards } from "../api/yugiohApi";
import bannerImg from "../assets/banner-new.png";
import CollectionTabs from "../components/CollectionTabs";

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

  const [formValues, setFormValues] = useState({ ...filters });

  // 🔥 NORMALIZADOR GLOBAL
  const normalizeCards = (data, type) => {
    return data.map((card) => ({
      id: card.id,
      name: card.name,
      image: card.image || card.imageUrl || card.card_images?.[0]?.image_url,
      // 🔥 Si el objeto ya trae "source" lo usamos, si no, usamos el "type" del tab
      source: card.source || type, 
      raw: card.raw || card
    }));
  };

  // 🔥 CARGA DE CARTAS
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

        data = normalizeCards([...magic, ...pokemon, ...yugioh]);
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
        
        let dataNormalized = normalizeCards(res);

        // 🔥 FILTRO POR TIPO ELEMENTAL
        if (currentFilters.types) {
          dataNormalized = dataNormalized.filter(card => 
            card.raw.types.some(t => t.type.name === currentFilters.types)
          );
        }

        // 🔥 FILTRO POR RAREZA (usando la lógica de stats de tu pokemonApi.js)
        if (currentFilters.rarity) {
          dataNormalized = dataNormalized.filter(card => 
            card.raw.rarity === currentFilters.rarity
          );
        }

        data = dataNormalized;
      }

      if (currentCollection === "yugioh") {
        const res = await getYugiohCards({
          search: currentFilters.search,
          type: currentFilters.yugiohType,       // Filtro directo
          attribute: currentFilters.yugiohAttribute, // Filtro directo
          level: currentFilters.yugiohLevel,     // Nuevo filtro
          page: pageNumber,
        });

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

  // 🔥 FORM
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters(formValues);
    setPage(1);
  };

  const handleReset = () => {
    const empty = {
      search: "",
      colors: "",
      rarity: "",
      types: "",
      yugiohType: "",
      yugiohAttribute: "",
    };

    setFormValues(empty);
    setFilters(empty);
    setPage(1);
  };

  const visibleCards = cards.slice(0, 24);
  
  return (
    <section className="homePage">

      {/* HERO */}
      <div className="heroBanner card">
        <img src={bannerImg} alt="CardDesk banner" className="heroBanner__image" />
        <div className="heroBanner__overlay">
          <h1 className="heroBanner__title">CardDesk</h1>
          <p className="heroBanner__text">
            Explora, guarda y organiza tus cartas favoritas
          </p>
        </div>
      </div>

      {/* FILTROS */}
      <div className="cardContainer">
        <div className="cardBody">
          <form onSubmit={handleSubmit} className="searchFilters">

            {/* FILA 1: Colección y Nombre */}
            <div className="searchFilters__top">
              <div className="searchFilters__group">
                <label className="label">Colección</label>
                <CollectionTabs
                  value={collectionType}
                  onChange={(value) => {
                    setCollectionType(value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="searchFilters__group">
                <label className="label">Buscar por nombre</label>
                <input
                  name="search"
                  className="input"
                  value={formValues.search}
                  onChange={handleChange}
                  placeholder="Ej: Mago Oscuro..."
                />
              </div>
            </div>

            {/* FILA 2: Filtros específicos dinámicos */}
            <div className="searchFilters__grid">
              {collectionType === "yugioh" && (
                <>
                  <div className="searchFilters__group">
                    <label className="label">Tipo</label>
                    <select name="yugiohType" className="input" value={formValues.yugiohType} onChange={handleChange}>
                      <option value="">Todos</option>
                      <option value="Monster">Monstruo</option>
                      <option value="Spell">Magia</option>
                      <option value="Trap">Trampa</option>
                    </select>
                  </div>

                  <div className="searchFilters__group">
                    <label className="label">Atributo</label>
                    <select name="yugiohAttribute" className="input" value={formValues.yugiohAttribute} onChange={handleChange}>
                      <option value="">Todos</option>
                      <option value="DARK">OSCURIDAD</option>
                      <option value="LIGHT">LUZ</option>
                      {/* ...resto de opciones */}
                    </select>
                  </div>

                  <div className="searchFilters__group">
                    <label className="label">Nivel</label>
                    <select name="yugiohLevel" className="input" value={formValues.yugiohLevel} onChange={handleChange}>
                      <option value="">Cualquiera</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              
              {/* Aquí irían los filtros de Pokémon cuando selecciones esa pestaña */}
            </div>

            {/* BOTONES AL FINAL */}
            <div className="searchFilters__actions">
              <button type="button" className="btn btnGhost" onClick={handleReset}>
                Limpiar Filtros
              </button>
              <button type="submit" className="btn btnPrimary">
                🔍 Buscar Cartas
              </button>
            </div>

            {/* 🔥 MAGIC */}
            {collectionType === "magic" && (
              <>
                <div className="searchFilters__group searchFilters__tipo">
                  <label className="label">Color</label>
                  <select name="colors" className="input" value={formValues.colors} onChange={handleChange}>
                    <option value="">Todos</option>
                    <option value="White">White</option>
                    <option value="Blue">Blue</option>
                    <option value="Black">Black</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                  </select>
                </div>

                <div className="searchFilters__group searchFilters__atributo">
                  <label className="label">Rareza</label>
                  <select name="rarity" className="input" value={formValues.rarity} onChange={handleChange}>
                    <option value="">Todas</option>
                    <option value="Common">Common</option>
                    <option value="Uncommon">Uncommon</option>
                    <option value="Rare">Rare</option>
                    <option value="Mythic Rare">Mythic</option>
                  </select>
                </div>

                <div className="searchFilters__group searchFilters__tipo">
                  <label className="label">Tipo</label>
                  <select name="types" className="input" value={formValues.types} onChange={handleChange}>
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

            {/* 🔥 POKÉMON  */}
              {collectionType === "pokemon" && (
                <>
                  <div className="searchFilters__group searchFilters__tipo">
                    <label className="label">Tipo Elemental</label>
                    <select 
                      name="types" 
                      className="input" 
                      value={formValues.types} 
                      onChange={handleChange}
                    >
                      <option value="">Todos los tipos</option>
                      <option value="fire">Fuego 🔥</option>
                      <option value="water">Agua 💧</option>
                      <option value="grass">Planta 🌿</option>
                      <option value="electric">Eléctrico ⚡</option>
                      <option value="psychic">Psíquico 🔮</option>
                      <option value="ice">Hielo ❄️</option>
                      <option value="dragon">Dragón 🐲</option>
                      <option value="dark">Siniestro 🌑</option>
                      <option value="fairy">Hada ✨</option>
                    </select>
                  </div>

                  {/* Puedes añadir un segundo filtro por rareza si quieres */}
                  <div className="searchFilters__group searchFilters__atributo">
                    <label className="label">Rareza (Simulada)</label>
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
                      <option value="Mythic Rare">Legendary</option>
                    </select>
                  </div>
                </>
              )}

            {/* 🔥 YUGIOH */}
              {collectionType === "yugioh" && (
                <>
                  <div className="searchFilters__group">
                    <label className="label">Tipo de Carta</label>
                    <select name="yugiohType" className="input" value={formValues.yugiohType} onChange={handleChange}>
                      <option value="">Todos</option>
                      <option value="Effect Monster">Efecto</option>
                      <option value="Normal Monster">Normal</option>
                      <option value="Spell Card">Magia</option>
                      <option value="Trap Card">Trampa</option>
                      <option value="Xyz Monster">Xyz</option>
                      <option value="Synchro Monster">Sincronía</option>
                    </select>
                  </div>

                  <div className="searchFilters__group">
                    <label className="label">Atributo</label>
                    <select name="yugiohAttribute" className="input" value={formValues.yugiohAttribute} onChange={handleChange}>
                      <option value="">Todos</option>
                      <option value="LIGHT">LUZ</option>
                      <option value="DARK">OSCURIDAD</option>
                      <option value="WATER">AGUA</option>
                      <option value="FIRE">FUEGO</option>
                      <option value="EARTH">TIERRA</option>
                      <option value="WIND">VIENTO</option>
                      <option value="DIVINE">DIVINO</option>
                    </select>
                  </div>

                  <div className="searchFilters__group">
                    <label className="label">Nivel/Rango</label>
                    <select name="yugiohLevel" className="input" value={formValues.yugiohLevel} onChange={handleChange}>
                      <option value="">Cualquiera</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                  </div>
                </>
              )}

            {/* 🔥 BOTONES */}
            <div className="searchFilters__actions">
              <button type="submit" className="btn btnPrimary">Buscar</button>
              <button type="button" className="btn btnGhost" onClick={handleReset}>
                Limpiar
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="homeResults pageTransition">

        {loading && (
          <div className="skeleton-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton-card"></div>
            ))}
          </div>
        )}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && cards.length > 0 && (
          <>
            <CardGrid cards={visibleCards} onSelectCard={setSelectedCard} />

            <div className="pagination">
              <button className="btn btnGhost" disabled={page === 1} onClick={() => setPage(page - 1)}>
                ← Anterior
              </button>

              <span className="paginationPage">Página {page}</span>

              <button className="btn btnPrimary" onClick={() => setPage(page + 1)}>
                Siguiente →
              </button>
            </div>
          </>
        )}

        {!loading && !error && cards.length === 0 && (
          <p>No se encontraron cartas</p>
        )}
      </div>

      {/* MODAL */}
      {selectedCard && (
        <div className="cardModalOverlay fadePage" onClick={() => setSelectedCard(null)}>
          <div className="cardModal animateModal glowModal" onClick={(e) => e.stopPropagation()}>
            <button className="cardModalClose" onClick={() => setSelectedCard(null)}>✕</button>

            <div className="cardModalContent">
              <div className="cardModalImage">
                <img src={selectedCard.image} alt={selectedCard.name} />
              </div>

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