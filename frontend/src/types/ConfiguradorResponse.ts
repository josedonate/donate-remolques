import { ConfiguracionEntradaDTO } from './ConfiguracionEntradaDTO';

export interface ConfiguradorResponse {
  configuracionAdaptada: ConfiguracionEntradaDTO;
  opcionesValidas: Partial<{
    tipo: ('normal' | 'basculante')[];
    alto: number[];
    mma: number[];
    numeroEjes: (1 | 2)[];
    kgPorEje: number[];
    freno: boolean[];
    luces: ('estandar' | 'led')[];
    ruedas: {
      pulgadasLlanta: string[];
      localizacionRuedas: ('porfuera' | 'pordebajo')[];
    };
    opcionales: {
      sobrelaterales: ('rejilla' | 'chapa')[];
      toldo: boolean[];
      apoyatableros: boolean[];
      tapadera: boolean[];
      rampas: boolean[];
    };
  }>;
  modelo3D: string | null;
  precioTotal: number;
  pesoEstimadoKg: number;
}
