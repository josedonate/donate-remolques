import { Remolque } from '../models/Remolque';

export function fromRemolqueToPrisma(remolque: Remolque) {
  return {
    familia: remolque.familia,
    nombre: remolque.nombre,
    ancho: remolque.dimensiones.ancho,
    largo: remolque.dimensiones.largo,
    alto: remolque.dimensiones.alto ?? null,
    mma: remolque.mma,
    numeroEjes: remolque.ejes.numeroEjes,
    kgPorEje: remolque.ejes.kgPorEje,
    freno: remolque.freno,
    basculante: remolque.basculante,
    ruedaJockey: remolque.ruedaJockey,
    pulgadasLlanta: remolque.rueda.pulgadasLlanta,
    numeracionNeumatico: remolque.rueda.numeracionNeumatico,
    sobrelaterales: remolque.sobrelaterales,
    toldo: remolque.toldo,
    tapadera: remolque.tapadera,
    apoyaTableros: remolque.apoyaTableros,
    urlModelo3D: remolque.urlModelo3D,
  };
}
