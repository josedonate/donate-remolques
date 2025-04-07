import Link from "next/link";
import { RemolqueTarjetaDTO } from "@/types/remolque";

type Props = RemolqueTarjetaDTO;

export default function RemolqueCard({
  id,
  referencia,
  familia,
  mma,
  dimensiones,
  ejes,
}: Props) {
  return (
    <Link
      href={`/remolques/${id}`}
      className="w-64 rounded-md overflow-hidden border shadow-sm hover:shadow-lg hover:scale-[1.02] transform-gpu will-change-transform transition-all bg-white flex flex-col z-10 relative"
    >
      {/* Imagen */}
      <div className="h-28 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
        Imagen no disponible
      </div>

      {/* Contenido */}
      <div className="p-3 flex flex-col gap-1 text-sm text-gray-800">
        <h3 className="text-base font-bold mb-1">{referencia}</h3>
        <p>
          <span className="font-semibold">Familia:</span> {familia}
        </p>
        <p>
          <span className="font-semibold">Dimensiones:</span>{" "}
          {dimensiones.ancho}×{dimensiones.largo}
          {dimensiones.alto ? `×${dimensiones.alto}` : ""} cm
        </p>
        <p>
          <span className="font-semibold">MMA:</span> {mma} kg
        </p>
        <p>
          <span className="font-semibold">Ejes:</span> {ejes.numeroEjes}
        </p>
      </div>
    </Link>
  );
}
