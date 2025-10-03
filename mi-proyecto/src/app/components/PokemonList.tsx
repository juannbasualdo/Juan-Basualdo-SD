"use client";

import { useEffect , useState } from "react";
import  axios from "axios";
import PokemonItem from "./PokemonItem";

type PokeListItem = { name: string; url: string };

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<PokeListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    let alive = true;

    const fetchPokemons = async () => {
      try {
        setLoading  (true);
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon", {
          params: { limit: 20 },
        });
        if (!alive) return;
        setPokemons(res.data.results as PokeListItem[]);
      } catch (e: any) {
        if (!alive)  return;
        setError(e?.message ?? "Error desconocido");
      } finally {
        if (alive) setLoading(false);
      }
    };

    fetchPokemons();
    return () => { alive =  false; }; // cleanup al desmontar
  }, []); // [] => solo al montar (Evito llamadas infinitas)

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p>Error: {error}</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {pokemons.map(p => (
        <li key=  {p.name} style={{ marginBottom: "0.75rem" }}>
          <PokemonItem  name={p.name} url={p.url} />
        </li>
      ))}
    </ul>
  );
}
