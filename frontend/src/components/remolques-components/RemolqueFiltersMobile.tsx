"use client";

import { useState } from "react";
import { FiltrosCatalogo } from "@/hooks/useRemolques";
import { SlidersHorizontal } from "lucide-react";

interface Props {
  filtros: FiltrosCatalogo;
  setFiltros: (f: FiltrosCatalogo) => void;
  onClear: () => void;
}

export default function RemolqueFiltersMobile({ filtros, setFiltros, onClear }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Botón superior para abrir el drawer */}
      <div className="flex justify-between items-center sm:hidden mb-4">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border rounded bg-white shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filtros
        </button>
      </div>

      {/* Drawer lateral */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="w-72 bg-white p-5 shadow-lg overflow-y-auto h-full">
            <h2 className="text-lg font-bold mb-6">Filtros</h2>

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
              <label className="block text-sm font-medium">Ejes</label>
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

            <div className="flex flex-col gap-2 mt-6">
              <button
                onClick={() => {
                  onClear();
                  handleClose();
                }}
                className="w-full text-sm bg-gray-200 hover:bg-gray-300 py-2 rounded"
              >
                Limpiar filtros
              </button>
              <button
                onClick={handleClose}
                className="w-full text-sm bg-blue-600 text-white py-2 rounded"
              >
                Aplicar filtros
              </button>
            </div>
          </div>

          {/* Fondo clicable para cerrar */}
          <div className="flex-1" onClick={handleClose}></div>
        </div>
      )}
    </>
  );
}
