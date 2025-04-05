import { RemolqueInput } from "../validators/remolque.validator";
import { ReglaNegocioError } from "../errors/ReglaNegocioError";

// Estas son las reglas que tiene que cumplir un remolque para que cumpla con la normativa de la DGT y la UE
export const aplicarReglasNegocioRemolque = (data: RemolqueInput) => {
  const { dimensiones, mma, ejes, freno } = data;
  const largo = dimensiones.largo;
  const ancho = dimensiones.ancho;
  const numeroEjes = ejes.numeroEjes;

  const categoria = mma <= 750 ? "O1" : "O2";

  const categoriasValidas = {
    O1: [300, 500, 650, 750],
    O2: [1000, 1300, 1600, 2000, 2500, 3000, 3500],
  };

  if (!categoriasValidas[categoria].includes(mma)) {
    throw new ReglaNegocioError(`El valor MMA=${mma} no es válido para la categoría ${categoria}`);
  }

  if (largo <= 100 || largo > 600) {
    throw new ReglaNegocioError("El largo debe estar entre 100cm y 600cm");
  }

  if (largo < 225 && numeroEjes !== 1) {
    throw new ReglaNegocioError("Si el largo es menor de 225cm, debe tener 1 eje");
  }

  if (largo > 250 && numeroEjes !== 2) {
    throw new ReglaNegocioError("Si el largo es mayor de 250cm, debe tener 2 ejes");
  }

  if (mma > 750 && !freno) {
    throw new ReglaNegocioError("Si el MMA es mayor de 750kg, debe tener freno");
  }

  if (mma > 750 && numeroEjes !== 2) {
    throw new ReglaNegocioError("Si el MMA es mayor de 750kg, debe tener 2 ejes");
  }

  if (categoria === "O1" && ancho < 100) {
    throw new ReglaNegocioError("Para categoría O1 (MMA <= 750kg), el ancho mínimo es 100cm");
  }

  if (categoria === "O2" && ancho < 140) {
    throw new ReglaNegocioError("Para categoría O2 (MMA > 750kg), el ancho mínimo es 140cm");
  }

  if (categoria === "O1" && ancho > 200) {
    throw new ReglaNegocioError("Para categoría O1 (MMA <= 750kg), el ancho máximo es 200cm");
  }

  if (categoria === "O2" && ancho > 255) {
    throw new ReglaNegocioError("Para categoría O2 (MMA > 750kg), el ancho máximo es 255cm");
  }
};
