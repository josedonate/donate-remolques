import { useEffect, useState } from "react";
import { RemolqueTarjetaDTO } from "@/types/remolque";
import { getRemolquesTarjeta } from "@/services/remolqueService";

export interface FiltrosCatalogo {
  familia?: string;
  mma?: number;
  ejes?: number;
}

export function useRemolques() {
    const [remolques, setRemolques] = useState<RemolqueTarjetaDTO[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      getRemolquesTarjeta({ page: 1, limit: 8 }) // solo los primeros para el slider
        .then((res) => {
          setRemolques(res.content);
        })
        .catch((err) => console.error("Error cargando remolques:", err))
        .finally(() => setLoading(false));
    }, []);
  
    return { remolques, loading };
  }

  export function useRemolquesCatalogo() {
    const [remolques, setRemolques] = useState<RemolqueTarjetaDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtros, setFiltros] = useState<FiltrosCatalogo>({});
    const [sort, setSort] = useState<string>("");
  
    useEffect(() => {
      setLoading(true);
  
      // Interpretar sort
      let sortParam;
      let direction: "asc" | "desc" | undefined;
  
      if (sort.includes("_")) {
        const [campo, dir] = sort.split("_");
        sortParam = campo;
        direction = dir as "asc" | "desc";
      }
  
      getRemolquesTarjeta({
        page,
        limit: 8,
        ...filtros,
        sort: sortParam,
        direction,
      })
        .then((res) => {
          setRemolques(res.content);
          setTotalPages(res.totalPages);
        })
        .catch((err) => console.error("Error cargando remolques:", err))
        .finally(() => setLoading(false));
    }, [page, filtros, sort]);
  
    return {
      remolques,
      loading,
      page,
      setPage,
      totalPages,
      filtros,
      setFiltros,
      sort,
      setSort,
    };
  }
  
