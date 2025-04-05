import { AppDataSource } from "../data-source";
import { Remolque } from "../models/Remolque";
import { RemolqueInput } from '../validators/remolque.validator';
import { aplicarReglasNegocioRemolque } from '../utils/reglasNegocioRemolque';

const repo = AppDataSource.getRepository(Remolque); // Repositorio de Remolque

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



