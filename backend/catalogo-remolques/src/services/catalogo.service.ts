import { AppDataSource } from "../data-source";
import { Remolque } from "../models/Remolque";

const repo = AppDataSource.getRepository(Remolque); // Repositorio de Remolque

export const obtenerRemolques = async (): Promise<Remolque[]> => {
  return await repo.find();
};

export const crearRemolque = async (data: Partial<Remolque>): Promise<Remolque> => {
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

