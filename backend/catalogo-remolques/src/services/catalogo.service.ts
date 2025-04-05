import { RemolqueInput } from '../validators/remolque.validator';
import { fromZodToRemolque } from '../mappers/fromZodToRemolque';
import { fromRemolqueToPrisma } from '../mappers/fromRemolqueToPrisma';
import CatalogoRepository from '../repositories/catalogo.repository';

class CatalogoService {
  async obtenerRemolques() {
    return await CatalogoRepository.obtenerRemolques();
  }

  async obtenerRemolquePorId(id: number) {
    return await CatalogoRepository.obtenerRemolquePorId(id);
  }

  async crearRemolque(data: RemolqueInput) {
    const remolque = fromZodToRemolque(data);
    const remolquePlano = fromRemolqueToPrisma(remolque);
    return await CatalogoRepository.crearRemolque(remolquePlano);
  }
}

export default new CatalogoService();
