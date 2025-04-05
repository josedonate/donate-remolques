import { RemolqueInput } from '../validators/remolque.validator';
import { Remolque } from '../models/Remolque';

export function fromZodToRemolque(data: RemolqueInput): Remolque {
  return new Remolque(
    0,
    data.familia,
    data.nombre,
    {
      ancho: data.dimensiones.ancho,
      largo: data.dimensiones.largo,
      alto: data.dimensiones.alto ?? undefined, // 🔧 Aquí convertimos null -> undefined
    },
    data.mma,
    data.ejes,
    data.freno,
    data.basculante,
    data.ruedaJockey,
    data.rueda,
    data.sobrelaterales,
    data.toldo,
    data.tapadera,
    data.apoyaTableros,
    data.urlModelo3D
  );
}
