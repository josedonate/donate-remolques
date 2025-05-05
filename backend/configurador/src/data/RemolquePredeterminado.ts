import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';

// 🎯 Configuración inicial por defecto
export const CONFIGURACION_PREDETERMINADA: ConfiguracionEntradaDTO = {
  dimensiones: {
    largo: 250,
    ancho: 140,
  },
  alto: 40,
  tipo: 'normal',
  mma: 750,
  numeroEjes: 1,
  kgPorEje: 750,
  freno: false,
  luces: 'estandar',
  ruedas: {
    pulgadasLlanta: '13',
    numeracionNeumatico: '175/70',
    localizacionRuedas: 'porfuera'
  },
  opcionales: {
    sobrelaterales: 'rejilla',
    toldo: false,
    apoyatableros: false,
    tapadera: false,
    rampas: false
  }
};