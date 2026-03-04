export default function CardGrid({ cards }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {cards.map((c) => (
        <article
          key={c.id}
          className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/40"
        >
          <div className="aspect-[3/4] w-full bg-slate-800">
            {/* imagen fake: luego vendrá del back */}
            {c.image ? (
              <img
                src={c.image}
                alt={c.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl">
                🃏
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="line-clamp-1 font-semibold">{c.name}</h3>
            <p className="text-xs text-slate-400">{c.collection}</p>
          </div>
        </article>
      ))}
    </div>
  );
}