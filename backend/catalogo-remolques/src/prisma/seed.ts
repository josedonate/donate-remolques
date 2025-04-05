// Fichero para introducir datos de prueba en la base de datos

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.remolque.createMany({
    data: [
      {
        familia: 'Plataforma',
        nombre: 'Remolque Básico',
        ancho: 1.2,
        largo: 2.5,
        mma: '<750kg',
        numeroEjes: 1,
        kgPorEje: 750,
        freno: false,
        basculante: false,
        ruedaJockey: true,
        pulgadasLlanta: 13,
        numeracionNeumatico: '165/70R13',
        sobrelaterales: 'ninguno',
        toldo: false,
        tapadera: false,
        apoyaTableros: false,
        urlModelo3D: '/modelos/remolque1.glb'
      },
      {
        familia: 'Ganadero',
        nombre: 'Remolque Cerrado',
        ancho: 1.4,
        largo: 3.0,
        alto: 1.2,
        mma: '750-3500kg',
        numeroEjes: 2,
        kgPorEje: 1000,
        freno: true,
        basculante: true,
        ruedaJockey: true,
        pulgadasLlanta: 14,
        numeracionNeumatico: '175/70R14',
        sobrelaterales: 'rejilla',
        toldo: true,
        tapadera: true,
        apoyaTableros: true,
        urlModelo3D: '/modelos/remolque2.glb'
      }
    ]
  });

  console.log('✅ Datos de prueba insertados');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
