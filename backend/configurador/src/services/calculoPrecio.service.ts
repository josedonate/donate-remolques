import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';
import { TARIFA_COMPONENTES } from '../tarifas/tarifas';

export const calcularPrecioRemolque = (
  config: ConfiguracionEntradaDTO
): { precioTotal: number; pesoEstimadoKg: number } => {
  let total = 0;
  const pesoEstimadoKg = estimarPeso(config);

  // 💰 Precio por aluminio
  total += pesoEstimadoKg * TARIFA_COMPONENTES.precioAluminioPorKg;

  // 💰 Freno
  if (config.freno) {
    total += TARIFA_COMPONENTES.freno;
  }

  // 💰 Luces
  total += TARIFA_COMPONENTES.luces[config.luces.toLowerCase() as 'estandar' | 'led'];

  // 💰 Ejes
  const precioEje = TARIFA_COMPONENTES.ejes[config.kgPorEje as keyof typeof TARIFA_COMPONENTES.ejes];
  if (precioEje) {
    total += config.numeroEjes * precioEje;
  }

  // 💰 Ruedas
  const precioRueda = TARIFA_COMPONENTES.ruedas[config.ruedas.pulgadasLlanta as keyof typeof TARIFA_COMPONENTES.ruedas];
  const numeroRuedas = config.numeroEjes * 2;
  if (precioRueda) {
    total += numeroRuedas * precioRueda;
  }

  // 💰 Opcionales
  const opc = config.opcionales;
  if (opc) {
    if (opc.sobrelaterales) {
      total += TARIFA_COMPONENTES.opcionales.sobrelaterales[opc.sobrelaterales.toLowerCase() as 'rejilla' | 'chapa'];
    }
    if (opc.toldo) total += TARIFA_COMPONENTES.opcionales.toldo;
    if (opc.apoyatableros) total += TARIFA_COMPONENTES.opcionales.apoyatableros;
    if (opc.tapadera) total += TARIFA_COMPONENTES.opcionales.tapadera;
    if (opc.rampas) total += TARIFA_COMPONENTES.opcionales.rampas;
  }

  return {
    precioTotal: Math.round(total),
    pesoEstimadoKg: Math.round(pesoEstimadoKg)
  };
};

const estimarPeso = (config: ConfiguracionEntradaDTO): number => {
  const { dimensiones, alto, numeroEjes } = config;
  const { ancho, largo } = dimensiones;

  // 📦 Peso de la caja (aluminio 2mm de grosor)
  const grosor = 0.2; // cm
  const densidadAluminio = 0.0027; // kg/cm³

  const superficieLateral = 2 * (ancho * alto + largo * alto);
  const superficieBase = ancho * largo;
  const superficieTotal = superficieLateral + superficieBase;

  const volumenMaterialCaja = superficieTotal * grosor; // en cm³
  const pesoCaja = volumenMaterialCaja * densidadAluminio;

  // 🔩 Estimación del chasis base
  let pesoChasis = 40;
  if (largo >= 300) pesoChasis += 20;
  if (numeroEjes === 2) pesoChasis *= 1.2;

  // 🚙 Ruedas (4 kg por unidad)
  const pesoRuedas = numeroEjes * 2 * 4; // 2 ruedas por eje y 4 kg por rueda

  // Total
  return pesoCaja + pesoChasis + pesoRuedas;
};
