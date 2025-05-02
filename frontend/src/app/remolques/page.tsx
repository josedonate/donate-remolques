"use client";

import { useState, useEffect } from "react";
import { getFamilies, getUsos } from "@/services/remolqueService";
import { useRemolquesCatalogo } from "@/hooks/useRemolques";
import RemolqueFilters from "@/components/remolques-components/RemolqueFilters";
import RemolqueFiltersMobile from "@/components/remolques-components/RemolqueFiltersMobile";
import SortDropdown from "@/components/remolques-components/SortDropdown";
import RemolquesGrid from "@/components/remolques-components/RemolquesGrid";
import { SlidersHorizontal } from "lucide-react";


export default function CatalogoRemolquesPage() {
  const {
    remolques,
    loading,
    page,
    setPage,
    totalPages,
    filtros,
    setFiltros,
    sort,
    setSort,
  } = useRemolquesCatalogo();

  const [filtersVisible, setFiltersVisible] = useState(true);

  // Aquí guardamos las familias y usos que vienen del backend
  const [families, setFamilies] = useState<string[]>([]);
  const [uses, setUses] = useState<string[]>([]);

  // Cargar familias y usos al montar
  useEffect(() => {
    getFamilies()
      .then(setFamilies)
      .catch((err) => console.error("Error al cargar familias:", err));

    getUsos()
      .then(setUses)
      .catch((err) => console.error("Error al cargar usos:", err));
  }, []);

  // Función para limpiar filtros
  const handleClearFilters = () => {
    setPage(1);
    setFiltros({});
    setSort("");
  };

  return (
    <main className="min-h-screen px-4 pt-8">
      {/* Sticky header (desktop) */}
      <div className="hidden lg:flex justify-between items-center sticky top-[106px] bg-white z-20 py-4 max-w-screen-xl mx-auto border-b">
        <h1 className="text-2xl font-bold">Catálogo de Remolques</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="text-sm h-9 px-3 py-3 border rounded bg-white shadow-sm hover:bg-gray-100 flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {filtersVisible ? "Ocultar filtros" : "Mostrar filtros"}
          </button>

          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Top bar móvil */}
      <div className="lg:hidden sticky top-[106px] z-20 bg-white border-b py-4 flex justify-between items-center max-w-screen-xl mx-auto">
        <h1
          className="font-bold whitespace-nowrap"
          style={{ fontSize: "clamp(1rem, 5vw, 1.25rem)" }}
        >
          Catálogo de Remolques
        </h1>
        <RemolqueFiltersMobile
          filtros={filtros}
          setFiltros={(f) => {
            setPage(1);
            setFiltros(f);
          }}
          sort={sort}
          setSort={setSort}
          onClear={handleClearFilters}
          families={families}
          uses={uses}
        />
      </div>

      {/* Layout horizontal */}
      <div className="flex gap-6 max-w-screen-xl mx-auto mt-[64px]">
        {/* Sidebar de filtros (desktop) */}
        <div
          className={`hidden lg:block transition-all duration-500 ease-in-out ${
            filtersVisible
              ? "max-w-[16rem] w-64 opacity-100"
              : "max-w-0 w-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="sticky top-[210px]">
            <RemolqueFilters
              filtros={filtros}
              setFiltros={(f) => {
                setPage(1);
                setFiltros(f);
              }}
              onClear={handleClearFilters}
              families={families}
              uses={uses}
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
