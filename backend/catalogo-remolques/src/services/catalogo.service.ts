import { AppDataSource } from "../data-source";
import { Remolque } from "../models/Remolque";
import { RemolqueInput } from '../validators/remolque.validator';
import { ReglaNegocioError } from "../errors/ReglaNegocioError";

const validarLogicaRemolque = (data: RemolqueInput) => {
  const largo = data.dimensiones.largo;
  const numeroEjes = data.ejes.numeroEjes;
  const mma = data.mma;
  const freno = data.freno;

  // 📏 Largo válido
  if (largo <= 100 || largo > 600) {
    throw new ReglaNegocioError("El largo del remolque debe ser mayor que 100cm y menor o igual que 600cm");
  }

  // 🔁 Validación por largo
  if (largo < 225 && numeroEjes !== 1) {
    throw new ReglaNegocioError("Si el largo es menor de 225cm, el remolque debe tener 1 eje");
  }

  if (largo > 250 && numeroEjes !== 2) {
    throw new ReglaNegocioError("Si el largo es mayor de 250cm, el remolque debe tener 2 ejes");
  }

  // ⚖️ Validación por MMA
  const esLigero = mma === "<=750kg";
  const esPesado = mma === "(750kg-3500kg]";

  if (esPesado && !freno) {
    throw new ReglaNegocioError("Si el MMA es mayor de 750kg, el remolque debe tener freno");
  }

  if (esPesado && numeroEjes !== 2) {
    throw new ReglaNegocioError("Si el MMA es mayor de 750kg, el remolque debe tener 2 ejes");
  }
};

const repo = AppDataSource.getRepository(Remolque); // Repositorio de Remolque

export const obtenerRemolques = async (): Promise<Remolque[]> => {
  return await repo.find();
};

export const crearRemolque = async (data: Partial<Remolque>): Promise<Remolque> => {
  validarLogicaRemolque(data as RemolqueInput);
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
  validarLogicaRemolque(merged as RemolqueInput);

  return await repo.save(merged);
};



