import prisma from '../prisma';

class CatalogoRepository {
  async obtenerRemolques() {
    return await prisma.remolque.findMany();
  }

  async obtenerRemolquePorId(id: number) {
    return await prisma.remolque.findUnique({
      where: { id }
    });
  }

  async crearRemolque(data: any) {
    return await prisma.remolque.create({ data });
  }
}

export default new CatalogoRepository();
