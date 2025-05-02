import { ConfiguracionEntradaDTO } from './configuracionEntrada.dto';

export interface ConfiguracionRespuestaDTO {
    configuracionValida: boolean;
    errores: string[];
    opcionesValidas: Partial<Record<keyof ConfiguracionEntradaDTO, any[]>>;
    modelo3D: 'alfa' | 'delta' | 'discovery' | 'explorer' | null;
    precioTotal: number;
    pesoEstimadoKg: number;
  }
  