"use client";

import { useState } from "react";
import { useRemolquesCatalogo } from "@/hooks/useRemolques";
import RemolqueFilters from "@/components/remolques-components/RemolqueFilters";
import RemolqueFiltersMobile from "@/components/remolques-components/RemolqueFiltersMobile";
import SortDropdown from "@/components/remolques-components/SortDropdown";
import RemolquesGrid from "@/components/remolques-components/RemolquesGrid";

export default function CatalogoRemolquesPage() {
  const {
    remolques,
    loading,
    page,
    setPage,
    totalPages,
    filtros,
    setFiltros,
  } = useRemolquesCatalogo();

  const [sort, setSort] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(true);

  const handleClearFilters = () => {
    setPage(1);
    setFiltros({});
  };

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Catálogo de Remolques</h1>

      {/* Top bar (mobile only) */}
      <div className="lg:hidden flex justify-between items-center mb-4">
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

      <div className="flex gap-6">
        {/* Sidebar filters (only on large screens) */}
        {filtersVisible && (
          <RemolqueFilters
            filtros={filtros}
            setFiltros={(f) => {
              setPage(1);
              setFiltros(f);
            }}
            onClear={handleClearFilters}
          />
        )}

        <div className="flex-1 w-full">
          {/* Top controls for desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="text-sm px-3 py-2 border rounded bg-white shadow-sm hover:bg-gray-100"
            >
              {filtersVisible ? "Ocultar filtros" : "Mostrar filtros"}
            </button>

            <SortDropdown value={sort} onChange={setSort} />
          </div>

          {/* Grid y paginación */}
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
