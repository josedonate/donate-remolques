import Link from 'next/link'

interface RemolqueCardProps {
  referencia: string
  imagen?: string
  mma: number
  tara: number
  freno: boolean
  id: string
}

export default function RemolqueCard({
  referencia,
  imagen,
  mma,
  tara,
  freno,
  id,
}: RemolqueCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white w-72 flex flex-col">
      {/* Imagen del remolque */}
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        {imagen ? (
          <img src={imagen} alt={referencia} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-500">Imagen no disponible</span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold">{referencia}</h3>
        <p className="text-sm text-gray-600">MMA: {mma} kg</p>
        <p className="text-sm text-gray-600">Tara: {tara} kg</p>
        <p className="text-sm text-gray-600">Freno: {freno ? 'Sí' : 'No'}</p>

        <Link
          href={`/remolques/${id}`}
          className="mt-auto text-blue-600 hover:underline text-sm font-medium"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
