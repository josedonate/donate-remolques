import Image from "next/image";
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
  urlImagen,
}: Props) {
  return (
    <Link
      href={`/remolques/${id}`}
      className="w-full rounded-md overflow-hidden border shadow-sm hover:shadow-md hover:scale-[1.01] transition-all bg-white flex flex-col"
    >
      {/* Imagen con aspecto controlado */}
      <div className="relative aspect-[4/3] w-full bg-gray-100">
        {urlImagen && urlImagen.trim() !== "" ? (
          <Image
            src={urlImagen}
            alt={`Imagen de ${referencia}`}
            fill
            className="object-contain p-2"
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
            priority
          />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
            Imagen no disponible
          </span>
        )}
      </div>

      {/* Detalles */}
      <div className="p-4 flex flex-col gap-1 text-sm text-gray-800">
        <h3 className="text-base font-bold mb-1">{referencia}</h3>
        <p><span className="font-semibold">Familia:</span> {familia}</p>
        <p>
          <span className="font-semibold">Dimensiones:</span>{" "}
          {dimensiones.ancho}×{dimensiones.largo}
          {dimensiones.alto ? `×${dimensiones.alto}` : ""} cm
        </p>
        <p><span className="font-semibold">MMA:</span> {mma} kg</p>
        <p><span className="font-semibold">Ejes:</span> {ejes.numeroEjes}</p>
      </div>
    </Link>
  );
}
