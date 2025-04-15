"use client";

import { RemolqueDTO } from "@/types/remolque";

interface Props {
  remolque: RemolqueDTO;
}

export default function RemolqueFeatures({ remolque }: Props) {
  const features: Record<string, string> = {
    Familia: remolque.familia,
    "MMA": `${remolque.mma} kg`,
    "Tara": `${remolque.tara} kg`,
    "Categoría": remolque.categoria,
    "Dimensiones": `${remolque.dimensiones.largo} x ${remolque.dimensiones.ancho}` +
      (remolque.dimensiones.alto ? ` x ${remolque.dimensiones.alto}` : "") + " cm",
    "Ejes": `${remolque.ejes.numeroEjes} (${remolque.ejes.kgPorEje} kg por eje)`,
    "Rueda": `${remolque.rueda.pulgadasLlanta}" - ${remolque.rueda.numeracionNeumatico}`,
    "Ubicación ruedas": remolque.rueda.localizacionRuedas === "porFuera" ? "Por fuera" : "Por debajo",
    ...(remolque.freno && { Freno: "Si" }),
    ...(remolque.basculante && { Basculante: "Si" }),
    ...(remolque.ruedaJockey && { "Rueda Jockey": "Si" }),
    ...(remolque.sobrelaterales && { Sobrelaterales: remolque.sobrelaterales }),
    ...(remolque.toldo && { Toldo: "Si" }),
    ...(remolque.tapadera && { Tapadera: "Si" }),
    ...(remolque.rampas && { Rampas: "Si" }),
    ...(remolque.apoyaTableros && { ApoyaTableros: "Si" }),
  };

  const entries = Object.entries(features);

  return (
    <aside className="w-full lg:w-[300px] bg-gray-100 p-6">
      <h2 className="text-xl font-bold mb-4">Características</h2>
      <ul className="text-sm text-gray-800">
        {entries.map(([key, value], idx) => (
          <li
            key={key}
            className={`py-2 ${idx !== entries.length - 1 ? "border-b border-gray-300" : ""}`}
          >
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    </aside>
  );
}
