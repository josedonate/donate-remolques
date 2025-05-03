import axios from '@/lib/axiosConfigurador';
import { ConfiguracionFormulario } from '@/types/configuracionFormulario';
import { ConfiguracionRespuestaDTO } from '@/types/configuracionRespuesta.dto';

const BASE_URL = '/configurador';

export const obtenerConfiguracionInicial = async (): Promise<ConfiguracionRespuestaDTO> => {
  const response = await axios.get<ConfiguracionRespuestaDTO>(BASE_URL);
  return response.data;
};

export const enviarConfiguracion = async (
  configuracion: ConfiguracionFormulario
): Promise<ConfiguracionRespuestaDTO> => {
  const response = await axios.post<ConfiguracionRespuestaDTO>(BASE_URL, configuracion);
  return response.data;
};
