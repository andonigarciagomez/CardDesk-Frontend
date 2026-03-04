import CardGrid from "../components/CardGrid";

const demoCards = [
  { id: 1, name: "Black Lotus", collection: "Magic", image: "" },
  { id: 2, name: "Charizard", collection: "Pokémon", image: "" },
  { id: 3, name: "Messi Rookie", collection: "Fútbol", image: "" },
  { id: 4, name: "Mox Sapphire", collection: "Magic", image: "" },
  { id: 5, name: "Pikachu", collection: "Pokémon", image: "" },
  { id: 6, name: "Mbappé Limited", collection: "Fútbol", image: "" },
];

export default function MyCards() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold">Mis cartas</h2>
          <p className="text-sm text-slate-400">
            Vista colección (grid). Luego añadimos filtros y buscador.
          </p>
        </div>

        <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium hover:bg-emerald-500">
          + Añadir
        </button>
      </div>

      <CardGrid cards={demoCards} />
    </div>
  );
}