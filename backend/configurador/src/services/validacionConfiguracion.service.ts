// backend/configurador/src/services/validacionConfiguracion.service.ts

import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';
import { ConfiguracionRespuestaDTO, opcionesValidasRespuestaDTO } from '../dto/configuracionRespuesta.dto';
import { obtenerModelo3D } from '../utils/modelo3D';
import { calcularPrecioRemolque } from './calculoPrecio.service';
import { configuracionSchema } from '../validators/configuracionSchema';
import { TARIFA_COMPONENTES } from '../tarifas/tarifas';
import { DIMENSIONES_DISPONIBLES } from '../data/dimensiones';

const MMA_POSIBLES = [300, 500, 650, 750, 1000, 1300, 1600, 2000, 2500, 3000, 3500];
const KG_POR_EJE_DISPONIBLES = [300, 500, 650, 750, 900, 1000, 1300, 1600, 1800];

const obtenerCategoriaMMA = (mma: number): 'O1' | 'O2' => {
  return mma <= 750 ? 'O1' : 'O2';
};

const corregirConfiguracion = (entrada: ConfiguracionEntradaDTO): ConfiguracionEntradaDTO => {
  const nueva = structuredClone(entrada);

  const categoria = obtenerCategoriaMMA(nueva.mma);
  const mmaValidos = MMA_POSIBLES.filter(m => obtenerCategoriaMMA(m) === categoria);

  if (!mmaValidos.includes(nueva.mma)) {
    let kgEje = nueva.kgPorEje * nueva.numeroEjes;
    for (const m of mmaValidos) {
      if (kgEje >= m) {
        nueva.mma = m;
        break;
      }
    }
  }

  const { ancho, largo } = nueva.dimensiones;

  // Largo vs Ejes
  if (largo < 225) {
    nueva.numeroEjes = 1;
  } else if (largo <= 250) {
    if (![1, 2].includes(nueva.numeroEjes)) nueva.numeroEjes = 1;
  } else {
    nueva.numeroEjes = 2;
  }

  // MMA vs ejes
  if (nueva.mma > 750) nueva.numeroEjes = 2;

  // MMA vs freno
  if (nueva.mma > 750) nueva.freno = true;
  if (nueva.numeroEjes === 2) nueva.freno = true;

  // Ancho mínimo
  const minAncho = categoria === 'O1' ? 100 : 140;
  if (nueva.dimensiones.ancho < minAncho) nueva.dimensiones.ancho = minAncho;

  // Ancho máximo por categoría
  if (categoria === 'O1' && nueva.dimensiones.ancho > 200) nueva.dimensiones.ancho = 200;
  if (categoria === 'O2' && nueva.dimensiones.ancho > 255) nueva.dimensiones.ancho = 255;

  // Tipo ruedas vs ancho
  if (nueva.ruedas.localizacionRuedas === 'pordebajo' && nueva.dimensiones.ancho < 140) {
    nueva.dimensiones.ancho = 140;
  }
  if (nueva.ruedas.localizacionRuedas === 'porfuera' && nueva.dimensiones.ancho > 180) {
    nueva.dimensiones.ancho = 180;
  }

  return nueva;
};

const generarOpcionesValidas = (config: ConfiguracionEntradaDTO): opcionesValidasRespuestaDTO => {
  const { largo, ancho } = config.dimensiones;
  const categoria = obtenerCategoriaMMA(config.mma); // O1 u O2

  // Ejes
  let numeroEjes: (1 | 2)[] = [];
  if (largo < 225) numeroEjes = [1];
  else if (largo <= 250) numeroEjes = [1, 2];
  else numeroEjes = [2];

  // MMA válidas
  const mma = MMA_POSIBLES.filter(config.numeroEjes === 1 ? m => m <= 750 : m => m >= 750);

  if (config.mma > 750) numeroEjes = numeroEjes.filter(e => e === 2);

  // Freno
  const freno = config.mma > 750 || config.numeroEjes === 2 ? [true] : [true, false];


  // Luces
  const luces: ("estandar" | "led")[] = ["estandar", "led"];

  // Tipo remolque
  const tipo: ("normal" | "basculante")[] = ["normal", "basculante"];

  // Alto
  const alto: number[] = [30, 40, 50];

  // Kilogramos por eje válidos según MMA y número de ejes
  //const kgPorEje = KG_POR_EJE_DISPONIBLES.filter(kg => kg >= config.mma / config.numeroEjes);
  const kgPorEje = KG_POR_EJE_DISPONIBLES.filter(kg => config.numeroEjes === 2 ? kg >= 750 : kg >= config.mma / config.numeroEjes);

  // Ruedas
  const pulgadasLlanta = Object.keys(TARIFA_COMPONENTES.ruedas);
  const localizacionRuedas: ("porfuera" | "pordebajo")[] = [];
  if (ancho >= 140) localizacionRuedas.push("pordebajo");
  if (ancho <= 180) localizacionRuedas.push("porfuera");

  const opcionales = {
    sobrelaterales: ["rejilla", "chapa"] as ("rejilla" | "chapa")[],
    toldo: [true, false],
    apoyatableros: [true, false],
    tapadera: [true, false],
    rampas: [true, false]
  };

  const dimensiones = DIMENSIONES_DISPONIBLES; // Siempre se mandan todas las dimensiones disponibles

  return {
    tipo,
    dimensiones,
    alto,
    mma,
    numeroEjes,
    kgPorEje,
    freno,
    luces,
    ruedas: {
      pulgadasLlanta,
      localizacionRuedas
    },
    opcionales
  };
};

export const procesarConfiguracion = (
  entrada: ConfiguracionEntradaDTO
): ConfiguracionRespuestaDTO => {

  // Validar la entrada con el esquema Zod
  const validacion = configuracionSchema.safeParse(entrada);
  if (!validacion.success) {
    throw new Error('Configuración inválida: formato incorrecto');
  }

  // comprueba si la configuracion es correcta
  const configuracionAdaptada = corregirConfiguracion(validacion.data);

  // generas las opciones válidas
  const opcionesValidas = generarOpcionesValidas(configuracionAdaptada);

  // calcular el precio y peso estimado
  const { precioTotal, pesoEstimadoKg } = calcularPrecioRemolque(configuracionAdaptada);

  // calcular el modelo 3D
  const modelo = obtenerModelo3D(configuracionAdaptada) ?? 'modelo-no-definido';

  return {
    configuracionAdaptada,
    opcionesValidas,
    precioTotal,
    pesoEstimadoKg,
    modelo
  };
};
