import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';

export const obtenerModelo3D = (config: ConfiguracionEntradaDTO): 'alfa' | 'delta' | 'discovery' | 'explorer' | null => {
  const { numeroEjes, ruedas } = config;

  if (numeroEjes === 1) {
    return ruedas.localizacionRuedas === 'porFuera' ? 'alfa' : 'delta';
  }

  if (numeroEjes === 2) {
    return ruedas.localizacionRuedas === 'porFuera' ? 'discovery' : 'explorer';
  }

  return null;
};
