import { AppDataSource } from "../data-source";
import { Remolque } from "../models/Remolque";
import { RemolqueInput } from '../validators/remolque.validator';
import { aplicarReglasNegocioRemolque } from '../utils/reglasNegocioRemolque';
import { USOS, UsoRemolque, USOS_POR_FAMILIA } from "../utils/familiasUsosRemolques";
import { In } from "typeorm";

const repo = AppDataSource.getRepository(Remolque);

interface FiltrosRemolque {
  familia?: string;
  mma?: number;
  ejes?: number;
  uso?: string;
}

export const obtenerRemolques = async (): Promise<Remolque[]> => {
  return await repo.find();
};

export const crearRemolque = async (data: Partial<Remolque>): Promise<Remolque> => {
  aplicarReglasNegocioRemolque(data as RemolqueInput);
  const nuevo = repo.create(data);
  return await repo.save(nuevo);
};

export const obtenerRemolquePorId = async (id: number): Promise<Remolque | null> => {
  return await repo.findOneBy({ id });
};

export const eliminarRemolquePorId = async (id: number): Promise<boolean> => {
  const resultado = await repo.delete(id);
  return resultado.affected !== 0;
};

export const actualizarRemolquePorId = async (
  id: number,
  data: Partial<Remolque>
): Promise<Remolque | null> => {
  const remolque = await repo.findOneBy({ id });
  if (!remolque) return null;

  const merged = repo.merge(remolque, data);
  aplicarReglasNegocioRemolque(merged as RemolqueInput);

  return await repo.save(merged);
};

export const obtenerRemolquesFiltrados = async (
  page: number,
  limit: number,
  filtros: FiltrosRemolque,
  sort?: string,
  direction: "asc" | "desc" = "asc"
) => {
  const skip = (page - 1) * limit;
  const query = repo.createQueryBuilder("remolque");

  // Filtro por familia (más específico, tiene prioridad)
  if (filtros.familia) {
    query.andWhere("remolque.familia = :familia", { familia: filtros.familia });

  // Filtro por uso → se traduce en múltiples familias compatibles
  } else if (filtros.uso && USOS.includes(filtros.uso as UsoRemolque)) {
    const usoValido = filtros.uso as UsoRemolque;

    const familiasFiltradas = Object.entries(USOS_POR_FAMILIA)
      .filter(([_, usos]) => usos.includes(usoValido))
      .map(([familia]) => familia);

    if (familiasFiltradas.length > 0) {
      query.andWhere("remolque.familia IN (:...familias)", { familias: familiasFiltradas });
    } else {
      // No hay remolques compatibles con este uso → lista vacía
      return { remolques: [], total: 0 };
    }
  }

  // Filtro por MMA (usamos valores específicos)
  if (filtros.mma === 750) {
    query.andWhere("remolque.mma <= :mma", { mma: 750 });
  } else if (filtros.mma === 3500) {
    query.andWhere("remolque.mma > 750 AND remolque.mma <= 3500");
  }

  // Filtro por ejes
  if (filtros.ejes) {
    query.andWhere(`remolque.ejes->>'numeroEjes' = :ejes`, { ejes: filtros.ejes.toString() });
  }

  //  Ordenación segura
  const allowedSortFields = ["referencia", "mma"];
  if (sort && allowedSortFields.includes(sort)) {
    query.orderBy(`remolque.${sort}`, direction.toUpperCase() as "ASC" | "DESC");
  }

  // Paginación
  query.skip(skip).take(limit);

  const [result, total] = await query.getManyAndCount();

  return {
    remolques: result,
    total,
  };
};
