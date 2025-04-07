"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import RemolqueCard from "./RemolqueCard";
import { RemolqueTarjetaDTO } from "@/types/remolque"; // Importa el tipo RemolqueTarjetaDTO desde el archivo correspondiente

export default function RemolquesSlider() {
  const [remolques, setRemolques] = useState<RemolqueTarjetaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRemolques = async () => {
      try {
        const response = await axios.get<RemolqueTarjetaDTO[]>(
          "/remolques/tarjetas"
        );
        setRemolques(response.data);
      } catch (error) {
        console.error("Error cargando remolques:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRemolques();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Cargando remolques...</p>;
  }

  return (
    <section className="mt-10">
      <h2 className="text-3xl font-semibold mb-4">Remolques destacados:</h2>
      <div className="px-1 py-2 flex overflow-x-auto gap-4 pb-2 relative z-0">
        {remolques.map((remolque) => (
            <RemolqueCard
              key={remolque.id}
              id={remolque.id}
              referencia={remolque.referencia}
              familia={remolque.familia}
              mma={remolque.mma}
              dimensiones={remolque.dimensiones}
              ejes={remolque.ejes}
              urlImagen={remolque.urlImagen}
            />
        ))}
      </div>
    </section>
  );
}
