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

  useEffect(() => {
    setLoading(true);
    getRemolquesTarjeta({ page, limit: 8, ...filtros })
      .then((res) => {
        setRemolques(res.content);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.error("Error cargando remolques:", err))
      .finally(() => setLoading(false));
  }, [page, filtros]);

  return {
    remolques,
    loading,
    page,
    setPage,
    totalPages,
    filtros,
    setFiltros,
  };
}
