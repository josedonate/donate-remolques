import axios from "@/lib/axios";
import { RemolqueTarjetaDTO, RemolqueDTO } from "@/types/remolque";

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

export async function getRemolqueById(id: number): Promise<RemolqueDTO> {
  const { data } = await axios.get<RemolqueDTO>(`/remolques/${id}`);
  return data;
}