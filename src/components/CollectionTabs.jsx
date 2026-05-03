export default function CollectionTabs({ value, onChange }) {
  return (
    <div className="tabs">
      <button
        type="button"
        className={`tab ${value === "magic" ? "active" : ""}`}
        onClick={() => onChange("magic")}
      >
        🧙 Magic
      </button>

      <button
        type="button"
        className={`tab ${value === "pokemon" ? "active" : ""}`}
        onClick={() => onChange("pokemon")}
      >
        ⚡ Pokémon
      </button>

      <button
        type="button"
        className={`tab ${value === "yugioh" ? "active" : ""}`}
        onClick={() => onChange("yugioh")}
      >
        🐉 Yu-Gi-Oh
      </button>

      <button
        type="button"
        className={`tab ${value === "all" ? "active" : ""}`}
        onClick={() => onChange("all")}
      >
        🌍 Explorar
      </button>
    </div>
  );
}