import { ConfiguracionEntradaDTO } from "./configuracionEntrada.dto";
import {DimensionDisponible} from "../data/dimensiones";

export interface opcionesValidasRespuestaDTO {

  tipo: ("normal" | "basculante")[];
  dimensiones: DimensionDisponible[]; // dimensiones: { ancho: number; largo: number }[];
  alto: number[];
  mma: number[];
  numeroEjes: (1 | 2)[];
  kgPorEje: number[];
  freno: boolean[];
  luces: ("estandar" | "led")[];
  ruedas: {
    pulgadasLlanta: string[];
    localizacionRuedas: ("porfuera" | "pordebajo")[];
  };
  opcionales: {
    sobrelaterales: ("rejilla" | "chapa")[];
    toldo: boolean[];
    apoyatableros: boolean[];
    tapadera: boolean[];
    rampas: boolean[];
  };
}

export interface ConfiguracionRespuestaDTO {
  opcionesValidas: opcionesValidasRespuestaDTO;
  configuracionAdaptada: ConfiguracionEntradaDTO;
  precioTotal: number;
  pesoEstimadoKg: number;
  modelo: string; // Nombre del modelo de remolque 3D a mostrar en el frontend
}
