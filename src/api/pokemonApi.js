const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getPokemonCards = async ({
  search = "",
  page = 1,
} = {}) => {

  const limit = 12;
  const offset = (page - 1) * limit;

  let url = `${BASE_URL}?limit=${limit}&offset=${offset}`;

  // si hay búsqueda, usamos endpoint directo
  if (search && search.trim() !== "") {
    try {
      const response = await fetch(`${BASE_URL}/${search.toLowerCase()}`);
      const data = await response.json();

      return [transformPokemon(data)];
    } catch (error) {
      return [];
    }
  }

  const response = await fetch(url);
  const data = await response.json();

  // obtenemos detalles de cada pokemon
  const detailed = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  return detailed.map(transformPokemon);
};


// 🔥 adaptamos a formato de tu app
const transformPokemon = (pokemon) => ({
  id: pokemon.id,
  name: pokemon.name,

  imageUrl:
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default,

  setName: "Pokémon",

  rarity: getRarityFromStats(pokemon.base_experience),

  type: pokemon.types.map((t) => t.type.name).join(", "),

  types: pokemon.types.map((t) => t.type.name),

  text: `HP: ${pokemon.stats[0].base_stat} | Ataque: ${pokemon.stats[1].base_stat}`,

  source: "pokemon",
});


// 🎯 simulamos rareza según stats
const getRarityFromStats = (exp) => {
  if (exp < 100) return "Common";
  if (exp < 200) return "Uncommon";
  if (exp < 300) return "Rare";
  return "Mythic Rare";
};