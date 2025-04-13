import { useEffect, useState } from "react";
import { RemolqueTarjetaDTO } from "@/types/remolque";
import { getRemolquesTarjeta } from "@/services/remolqueService";

export function useRemolques() {
  const [remolques, setRemolques] = useState<RemolqueTarjetaDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRemolquesTarjeta()
      .then(setRemolques)
      .catch((err) => console.error("Error cargando remolques:", err))
      .finally(() => setLoading(false));
  }, []);

  return { remolques, loading };
}
