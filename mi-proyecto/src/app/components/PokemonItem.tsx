"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Props = { name: string; url: string };

export default function PokemonItem({ name, url }: Props) {
  const [clicks, setClicks] =   useState(0);
  const [types, setTypes] = useState<string[]>([]);

  // Extriago el ID del Pokémon de la url
  const parts = url.split("/").filter(Boolean);
  const id = Number(parts[parts.length - 1]);

  // Sprite (imagen) según el ID
  const spriteUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  // useEffect: al montar, pido propiedades extra (tipos)
  useEffect(() => {
    let alive = true;
    (async () =>  {
      try {
        const res = await axios.get(url);
        if (!alive) return;
        const ts = res.data.types.map((t: any) => t.type.name) as string[];
        setTypes(ts);
      } catch (e) {
        console.error("Error cargando detalles de Pokémon", e);
      }
    })();

    return () => { alive = false; };
  }, [url]);

  return (
    <button
      onClick={() => setClicks(c => c + 1)}
      style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.5rem 0.75rem", border: "1px solid #ddd",
        borderRadius: "8px", background: "#fff", cursor: "pointer"
      }}
      aria-label={`Seleccionar ${name}`}
    >
      <img src={spriteUrl} alt={name} width={56} height={56} />
      <div>
        <strong style={{ textTransform: "capitalize" }}>{name}</strong>
        <div style={{ fontSize: "0.85rem", color: "#444" }}>
          ID: {id}
        </div>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          Tipos: {types.length ? types.join(", ") : "—"}
        </div>
        <div style={{ fontSize: "0.85rem", color: "#555" }}>
          Clicks: {clicks}
        </div>
      </div>
    </button>
  );
}
