// src/data/configuracionInicial.ts
import { ConfiguracionEntradaDTO } from '@/types/ConfiguracionEntradaDTO';

export const CONFIGURACION_INICIAL: ConfiguracionEntradaDTO = {
  tipo: 'normal',
  dimensiones: {
    ancho: 145,
    largo: 230,
    alto: 30 // calculado en base a largo < 300
  },
  mma: 500,
  numeroEjes: 1,
  kgPorEje: 650,
  freno: false,
  ruedas: {
    pulgadasLlanta: '14',
    numeracionNeumatico: '185R14C',
    localizacionRuedas: 'porfuera'
  },
  sistemaBasculante: undefined,
  luces: 'estandar',
  opcionales: {
    toldo: false,
    apoyatableros: false,
    tapadera: false,
    rampas: false
  }
};
