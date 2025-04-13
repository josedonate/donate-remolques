import { FiltrosCatalogo } from "@/hooks/useRemolques";

interface Props {
  filtros: FiltrosCatalogo;
  setFiltros: (filtros: FiltrosCatalogo) => void;
  onClear: () => void;
}

export default function RemolqueFilters({ filtros, setFiltros, onClear }: Props) {
  return (
    <aside className="hidden lg:block w-64 p-4 bg-gray-100 rounded-md">
      <h3 className="text-lg font-semibold mb-4">Filtros</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium">Familia</label>
        <select
          value={filtros.familia || ""}
          onChange={(e) => setFiltros({ ...filtros, familia: e.target.value || undefined })}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Todas</option>
          <option value="Portacoches">Portacoches</option>
          <option value="Ganadero">Ganadero</option>
          <option value="Basculante">Basculante</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">MMA</label>
        <div className="flex flex-col gap-1 mt-1">
          <label>
            <input
              type="radio"
              name="mma"
              checked={filtros.mma === 750}
              onChange={() => setFiltros({ ...filtros, mma: 750 })}
              className="mr-2"
            />
            Hasta 750 kg
          </label>
          <label>
            <input
              type="radio"
              name="mma"
              checked={filtros.mma === 3500}
              onChange={() => setFiltros({ ...filtros, mma: 3500 })}
              className="mr-2"
            />
            Hasta 3500 kg
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium">Nº Ejes</label>
        <select
          value={filtros.ejes || ""}
          onChange={(e) => setFiltros({ ...filtros, ejes: parseInt(e.target.value) || undefined })}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="1">1 eje</option>
          <option value="2">2 ejes</option>
        </select>
      </div>

      <button
        onClick={onClear}
        className="mt-6 w-full bg-gray-200 hover:bg-gray-300 text-sm font-medium py-2 rounded"
      >
        Limpiar filtros
      </button>
    </aside>
  );
}
