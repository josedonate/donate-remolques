// Error para controlar que se cumplen las reglas de negocio a la hora de crear un remolque y que no se creen remolques inválidos
export class ReglaNegocioError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ReglaNegocioError";
    }
}
  