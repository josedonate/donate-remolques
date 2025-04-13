import RemolqueCard from "./RemolqueCard";
import { RemolqueTarjetaDTO } from "@/types/remolque";

interface Props {
  remolques: RemolqueTarjetaDTO[];
  loading: boolean;
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function RemolquesGrid({ remolques, loading, page, totalPages, setPage }: Props) {
  if (loading) return <p className="text-center mt-8">Cargando remolques...</p>;

  if (!remolques.length) {
    return <p className="text-center mt-8 text-gray-600">No se encontraron remolques.</p>;
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {remolques.map((r) => (
          <RemolqueCard key={r.id} {...r} />
        ))}
      </div>

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded ${
              page === i + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
