import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';

export const obtenerModelo3D = (config: ConfiguracionEntradaDTO): 'alfa' | 'delta' | 'discovery' | 'explorer' | null => {
  const { numeroEjes, ruedas } = config;

  if (numeroEjes === 1) {
    return ruedas.localizacionRuedas === 'porfuera' ? 'alfa' : 'delta';
  }

  if (numeroEjes === 2) {
    return ruedas.localizacionRuedas === 'porfuera' ? 'discovery' : 'explorer';
  }

  return null;
};
