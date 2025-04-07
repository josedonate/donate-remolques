import { Remolque } from '../models/Remolque'
import { RemolqueTarjetaDTO } from '../dto/RemolqueTarjetaDTO'
import { RemolqueDTO } from '../dto/RemolqueDTO'

// Archivo dedicado a la conversion de un remolque a su DTO correspondiente
// y viceversa. Se utiliza para transformar los datos de la base de datos a un formato.

export function toRemolqueTarjetaDTO(remolque: Remolque): RemolqueTarjetaDTO {
  return {
    id: remolque.id,
    referencia: remolque.referencia,
    familia: remolque.familia,
    mma: remolque.mma,
    dimensiones: remolque.dimensiones,
    ejes: {
      numeroEjes: remolque.ejes.numeroEjes,
    },
  }
}

export function toRemolqueDTO(remolque: Remolque): RemolqueDTO {
    return {
      id: remolque.id,
      referencia: remolque.referencia,
      familia: remolque.familia,
      mma: remolque.mma,
      tara: remolque.tara,
      categoria: remolque.categoria,
      dimensiones: remolque.dimensiones,
      ejes: remolque.ejes,
      rueda: remolque.rueda,
      freno: remolque.freno,
      basculante: remolque.basculante,
      ruedaJockey: remolque.ruedaJockey,
      sobrelaterales: remolque.sobrelaterales,
      toldo: remolque.toldo,
      tapadera: remolque.tapadera,
      rampas: remolque.rampas,
      apoyaTableros: remolque.apoyaTableros,
      urlModelo3D: remolque.urlModelo3D,
    }
  }
