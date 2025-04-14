"use client";

import { useState } from "react";
import { useRemolquesCatalogo } from "@/hooks/useRemolques";
import RemolqueFilters from "@/components/remolques-components/RemolqueFilters";
import RemolqueFiltersMobile from "@/components/remolques-components/RemolqueFiltersMobile";
import SortDropdown from "@/components/remolques-components/SortDropdown";
import RemolquesGrid from "@/components/remolques-components/RemolquesGrid";

export default function CatalogoRemolquesPage() {
  const { remolques, loading, page, setPage, totalPages, filtros, setFiltros } =
    useRemolquesCatalogo();

  const [sort, setSort] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(true);

  const handleClearFilters = () => {
    setPage(1);
    setFiltros({});
  };

  return (
    <main className="min-h-screen px-4 pt-12">
      {/* Título + Botones (sticky header en desktop) */}
      <div className="hidden lg:flex justify-between items-center sticky top-[122px] bg-white z-20 py-4 max-w-screen-xl mx-auto border-b">
        <h1 className="text-2xl font-bold">Catálogo de Remolques</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="text-xs h-9 px-3 py-1 border rounded bg-white shadow-sm hover:bg-gray-100"
          >
            {filtersVisible ? "Ocultar filtros" : "Mostrar filtros"}
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Top bar móvil */}
      <div className="lg:hidden flex justify-between items-center max-w-screen-xl mx-auto pt-12 mb-4">
        <RemolqueFiltersMobile
          filtros={filtros}
          setFiltros={(f) => {
            setPage(1);
            setFiltros(f);
          }}
          onClear={handleClearFilters}
        />
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      {/* Layout horizontal */}
      <div className="flex gap-6 max-w-screen-xl mx-auto mt-[64px]">
        {/* Sidebar filtros (sticky y alineado con el grid) */}
        <div
          className={`
            hidden lg:block transition-all duration-500 ease-in-out
            ${
              filtersVisible
                ? "max-w-[16rem] w-64 opacity-100"
                : "max-w-0 w-0 opacity-0 pointer-events-none"
            }
          `}
        >
          <div className="sticky top-[210px]">
            {/* top = altura del navbar + top del bloque de título */}
            <RemolqueFilters
              filtros={filtros}
              setFiltros={(f) => {
                setPage(1);
                setFiltros(f);
              }}
              onClear={handleClearFilters}
            />
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 w-full">
          <RemolquesGrid
            remolques={remolques}
            loading={loading}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
          />
        </div>
      </div>
    </main>
  );
}
