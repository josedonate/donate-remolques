"use client";

import { RemolqueDTO } from "@/types/remolque";

interface Props {
  remolque: RemolqueDTO;
}

export default function RemolqueFeatures({ remolque }: Props) {
  const features: Record<string, string | number | boolean | undefined> = {
    Familia: remolque.familia,
    MMA: `${remolque.mma} kg`,
    Tara: `${remolque.tara} kg`,
    Categoría: remolque.categoria,
    "Dimensiones": `${remolque.dimensiones.largo} x ${remolque.dimensiones.ancho}` +
      (remolque.dimensiones.alto ? ` x ${remolque.dimensiones.alto}` : "") + " cm",
    "Ejes": `${remolque.ejes.numeroEjes} (${remolque.ejes.kgPorEje} kg/eje)`,
    "Rueda": `${remolque.rueda.pulgadasLlanta}" - ${remolque.rueda.numeracionNeumatico}`,
    "Ubicación ruedas": remolque.rueda.localizacionRuedas === "porFuera" ? "Por fuera" : "Por debajo",
    Freno: remolque.freno && "Sí",
    Basculante: remolque.basculante && "Sí",
    "Rueda Jockey": remolque.ruedaJockey && "Sí",
    Sobrelaterales: remolque.sobrelaterales,
    Toldo: remolque.toldo && "Sí",
    Tapadera: remolque.tapadera && "Sí",
    Rampas: remolque.rampas && "Sí",
    ApoyaTableros: remolque.apoyaTableros && "Sí",
  };

  return (
    <aside className="w-full lg:w-[320px] border rounded-lg p-6 shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Características</h2>
      <ul className="space-y-2 text-sm text-gray-800">
        {Object.entries(features).map(
          ([key, value]) =>
            value !== undefined &&
            value !== false && (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            )
        )}
      </ul>
    </aside>
  );
}
