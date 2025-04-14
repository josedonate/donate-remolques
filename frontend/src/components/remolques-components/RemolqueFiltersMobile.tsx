"use client";

import { useState } from "react";
import { FiltrosCatalogo } from "@/hooks/useRemolques";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  filtros: FiltrosCatalogo;
  setFiltros: (f: FiltrosCatalogo) => void;
  sort: string;
  setSort: (s: string) => void;
  onClear: () => void;
}

export default function RemolqueFiltersMobile({
  filtros,
  setFiltros,
  sort,
  setSort,
  onClear,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [localFiltros, setLocalFiltros] = useState(filtros);
  const [localSort, setLocalSort] = useState(sort);

  const numFiltrosActivos = Object.values(localFiltros).filter(Boolean).length;

  const handleApply = () => {
    setFiltros(localFiltros);
    setSort(localSort);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalFiltros({});
    setLocalSort("");
    onClear();
  };

  return (
    <>
      {/* Botón de apertura */}
      <div className="flex justify-end w-full">
        <button
          onClick={() => {
            setLocalFiltros(filtros);
            setLocalSort(sort);
            setIsOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 border rounded bg-white shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Drawer pantalla completa */}
      {isOpen && (
        <div className="fixed inset-0 z-50 pt-32 bg-white flex flex-col lg:hidden">
          {/* Header con botón cerrar */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-bold">Filtros</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido scrollable */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Ordenación */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">
                Ordenar por
              </label>
              <select
                value={localSort}
                onChange={(e) => setLocalSort(e.target.value)}
                className="w-full border rounded p-2"
              >
                <option value="">Por defecto</option>
                <option value="referencia_asc">Referencia (A-Z)</option>
                <option value="mma_asc">MMA (menor a mayor)</option>
                <option value="mma_desc">MMA (mayor a menor)</option>
              </select>
            </div>

            {/* Filtros */}
            <div className="mb-4">
              <label className="block text-sm font-medium">Familia</label>
              <select
                value={localFiltros.familia || ""}
                onChange={(e) =>
                  setLocalFiltros({
                    ...localFiltros,
                    familia: e.target.value || undefined,
                  })
                }
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
                    checked={localFiltros.mma === 750}
                    onChange={() =>
                      setLocalFiltros({ ...localFiltros, mma: 750 })
                    }
                    className="mr-2"
                  />
                  Hasta 750 kg
                </label>
                <label>
                  <input
                    type="radio"
                    name="mma"
                    checked={localFiltros.mma === 3500}
                    onChange={() =>
                      setLocalFiltros({ ...localFiltros, mma: 3500 })
                    }
                    className="mr-2"
                  />
                  Hasta 3500 kg
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Ejes</label>
              <select
                value={localFiltros.ejes || ""}
                onChange={(e) =>
                  setLocalFiltros({
                    ...localFiltros,
                    ejes: parseInt(e.target.value) || undefined,
                  })
                }
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="">Todos</option>
                <option value="1">1 eje</option>
                <option value="2">2 ejes</option>
              </select>
            </div>
          </div>

          {/* Footer fijo */}
          <div className="p-4 border-t bg-white flex gap-2">
            <button
              onClick={handleClear}
              className="flex-1 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            >
              Borrar{numFiltrosActivos > 0 ? ` (${numFiltrosActivos})` : ""}
            </button>
            <button
              onClick={handleApply}
              className="flex-1 py-2 text-sm bg-blue-600 text-white rounded"
            >
              Aplicar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
