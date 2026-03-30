import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import CardGrid from "../components/CardGrid";

export default function MyCards() {
  const { favorites, clearFavorites } = useFavorites();
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <section className="myCardsPage">
      <div className="card">
        <div className="cardBody">
          <h1 className="h1">Mi colección</h1>

          <p className="p">
            Aquí puedes ver todas las cartas que has guardado.
          </p>

          {favorites.length > 0 && (
            <div className="myCardsActions">
              <button className="btn btnDanger" onClick={clearFavorites}>
                Vaciar colección
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="homeResults">
        <h2 className="homeResults__title">Cartas guardadas</h2>

        {favorites.length > 0 ? (
          <CardGrid
            cards={favorites}
            onSelectCard={setSelectedCard}
            showRemove={true}
          />
        ) : (
          <div className="card">
            <div className="cardBody">
              <p className="p">
                Todavía no has guardado ninguna carta.
              </p>
            </div>
          </div>
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
                {selectedCard.imageUrl ? (
                  <img src={selectedCard.imageUrl} alt={selectedCard.name} />
                ) : (
                  <div className="cardModalPlaceholder">🃏</div>
                )}
              </div>

              <div className="cardModalInfo">
                <h3>{selectedCard.name}</h3>

                <p>
                  <strong>Set:</strong> {selectedCard.setName || "N/A"}
                </p>

                <p>
                  <strong>Rareza:</strong> {selectedCard.rarity || "N/A"}
                </p>

                <p>
                  <strong>Tipo:</strong>{" "}
                  {selectedCard.type ||
                    selectedCard.types?.join(", ") ||
                    "N/A"}
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