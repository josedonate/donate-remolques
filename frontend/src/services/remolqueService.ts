import axios from "@/lib/axios";
import { RemolqueTarjetaDTO } from "@/types/remolque";

export async function getRemolquesTarjeta(): Promise<RemolqueTarjetaDTO[]> {
  const { data } = await axios.get<RemolqueTarjetaDTO[]>("/remolques/tarjetas");
  return data;
}
