-- CreateTable
CREATE TABLE "Remolque" (
    "id" SERIAL NOT NULL,
    "familia" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "ancho" DOUBLE PRECISION NOT NULL,
    "largo" DOUBLE PRECISION NOT NULL,
    "alto" DOUBLE PRECISION,
    "mma" TEXT NOT NULL,
    "numeroEjes" INTEGER NOT NULL,
    "kgPorEje" INTEGER NOT NULL,
    "freno" BOOLEAN NOT NULL,
    "basculante" BOOLEAN NOT NULL,
    "ruedaJockey" BOOLEAN NOT NULL,
    "pulgadasLlanta" INTEGER NOT NULL,
    "numeracionNeumatico" TEXT NOT NULL,
    "sobrelaterales" TEXT NOT NULL,
    "toldo" BOOLEAN NOT NULL,
    "tapadera" BOOLEAN NOT NULL,
    "apoyaTableros" BOOLEAN NOT NULL,
    "urlModelo3D" TEXT NOT NULL,

    CONSTRAINT "Remolque_pkey" PRIMARY KEY ("id")
);
