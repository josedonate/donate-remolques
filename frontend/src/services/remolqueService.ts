import axios from "@/lib/axios";
import { RemolqueTarjetaDTO } from "@/types/remolque";

interface QueryParams {
  page?: number;
  limit?: number;
  familia?: string;
  mma?: number;
  ejes?: number;
  sort?: string;
  direction?: "asc" | "desc";
}


interface PaginatedRemolquesResponse {
  content: RemolqueTarjetaDTO[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

export async function getRemolquesTarjeta(
  params?: QueryParams
): Promise<PaginatedRemolquesResponse> {
  const { data } = await axios.get<PaginatedRemolquesResponse>("/remolques/tarjetas", { params });
  return data;
}
