import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';

interface ValidacionResultado {
  configuracionValida: boolean;
  errores: string[];
  opcionesValidas: Partial<Record<keyof ConfiguracionEntradaDTO, any[]>>;
}

export const validarConfiguracionRemolque = (
  configuracion: ConfiguracionEntradaDTO
): ValidacionResultado => {
  const errores: string[] = [];
  const opcionesValidas: Partial<Record<keyof ConfiguracionEntradaDTO, any[]>> = {};

  const { dimensiones, mma, numeroEjes, freno, ruedas } = configuracion;

  // CATEGORÍA
  const categoria = mma <= 750 ? 'O1' : 'O2';

  // ✔️ Validar largo -> número de ejes permitido
  if (dimensiones.largo < 100 || dimensiones.largo > 600) {
    errores.push('El largo debe estar entre 100cm y 600cm.');
  } else {
    if (dimensiones.largo < 225 && numeroEjes !== 1) {
      errores.push('Para largo < 225cm, el número de ejes debe ser 1.');
    }
    if (dimensiones.largo > 250 && numeroEjes !== 2) {
      errores.push('Para largo > 250cm, el número de ejes debe ser 2.');
    }
    if (dimensiones.largo >= 225 && dimensiones.largo <= 250) {
      opcionesValidas.numeroEjes = [1, 2];
    }
  }

  // ✔️ Validar MMA frente a número de ejes
  if (mma > 750 && numeroEjes !== 2) {
    errores.push('Para MMA > 750kg, el remolque debe tener 2 ejes.');
  }

  // ✔️ Validar freno según MMA
  if (mma > 750 && !freno) {
    errores.push('Para MMA > 750kg, el remolque debe tener freno.');
  }

  // ✔️ Validar ancho mínimo y máximo según categoría y ruedas
  if (categoria === 'O1' && dimensiones.ancho < 100) {
    errores.push('Para categoría O1, el ancho mínimo es 100cm.');
  }
  if (categoria === 'O2' && dimensiones.ancho < 140) {
    errores.push('Para categoría O2, el ancho mínimo es 140cm.');
  }

  if (categoria === 'O1' && dimensiones.ancho > 200) {
    errores.push('Para categoría O1, el ancho máximo es 200cm.');
  }
  if (categoria === 'O2' && dimensiones.ancho > 255) {
    errores.push('Para categoría O2, el ancho máximo es 255cm.');
  }

  // ✔️ Reglas por tipo de ruedas
  if (ruedas === 'porDebajo' && dimensiones.ancho < 140) {
    errores.push('Con ruedas por debajo, el ancho debe ser mínimo 140cm.');
  }
  if (ruedas === 'porFuera' && dimensiones.ancho > 180) {
    errores.push('Con ruedas por fuera, el ancho máximo es 180cm.');
  }

  // TODO: Validar peso por eje y posibles valores válidos de kgPorEje

  const configuracionValida = errores.length === 0;

  return {
    configuracionValida,
    errores,
    opcionesValidas
  };
};
