// frontend/src/components/remolques-components/RemolqueFilters.tsx

import { useEffect, useState } from "react";
import { FiltrosCatalogo } from "@/hooks/useRemolques";
import { getFamiliesByUso } from "@/services/remolqueService";

interface Props {
  filtros: FiltrosCatalogo;
  setFiltros: (filtros: FiltrosCatalogo) => void;
  onClear: () => void;
  families: string[]; // Todas las familias posibles
  uses: string[];     // Todos los usos
}

export default function RemolqueFilters({
  filtros,
  setFiltros,
  onClear,
  families,
  uses,
}: Props) {
  // Estado local para las familias filtradas según el uso
  const [filteredFamilies, setFilteredFamilies] = useState<string[]>(families);

  // Cada vez que cambie el uso, consultamos las familias compatibles
  useEffect(() => {
    if (!filtros.uso) {
      // Si no hay uso seleccionado, mostramos todas las familias
      setFilteredFamilies(families);
    } else {
      // Llamamos al backend para obtener las familias que soportan ese uso
      getFamiliesByUso(filtros.uso)
        .then((res) => setFilteredFamilies(res))
        .catch((err) => {
          console.error("Error al cargar familias por uso:", err);
          setFilteredFamilies([]); // en caso de error, devolvemos array vacío
        });
    }
  }, [filtros.uso, families]);

  return (
    <aside className="hidden lg:block w-64 p-4 bg-gray-100 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>

      {/* Filtro de Uso (primero) */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Uso</label>
        <select
          value={filtros.uso ?? ""}
          onChange={(e) =>
            setFiltros({ ...filtros, uso: e.target.value || undefined })
          }
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Todos</option>
          {uses.map((uso) => (
            <option key={uso} value={uso}>
              {uso}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Familias (segundo) */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Familia</label>
        <select
          value={filtros.familia ?? ""}
          onChange={(e) =>
            setFiltros({ ...filtros, familia: e.target.value || undefined })
          }
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Todas</option>
          {filteredFamilies.map((fam) => (
            <option key={fam} value={fam}>
              {fam}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de MMA */}
      <div className="mb-4">
        <label className="block text-sm font-medium">MMA</label>
        <div className="flex flex-col gap-1 mt-1">
          <label>
            <input
              type="radio"
              name="mma"
              checked={filtros.mma === 750}
              onChange={() =>
                setFiltros({ ...filtros, mma: 750 })
              }
              className="mr-2"
            />
            Hasta 750 kg
          </label>
          <label>
            <input
              type="radio"
              name="mma"
              checked={filtros.mma === 3500}
              onChange={() =>
                setFiltros({ ...filtros, mma: 3500 })
              }
              className="mr-2"
            />
            Hasta 3500 kg
          </label>
        </div>
      </div>

      {/* Filtro de Ejes */}
      <div className="mb-4">
        <label className="block text-sm font-medium">Nº Ejes</label>
        <select
          value={filtros.ejes ?? ""}
          onChange={(e) =>
            setFiltros({
              ...filtros,
              ejes: e.target.value ? parseInt(e.target.value) : undefined,
            })
          }
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="1">1 eje</option>
          <option value="2">2 ejes</option>
        </select>
      </div>

      {/* Botón limpiar */}
      <button
        onClick={onClear}
        className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-sm font-medium py-2 rounded"
      >
        Limpiar filtros
      </button>
    </aside>
  );
}
