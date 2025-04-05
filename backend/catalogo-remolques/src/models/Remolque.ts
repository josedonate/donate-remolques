export type MMA = '<=750kg' | '(750kg-3500kg]';
export type TipoSobrelateral = 'ninguno' | 'chapa' | 'rejilla';

export interface Dimensiones {
  ancho: number;
  largo: number;
  alto?: number;
}

export interface Ejes {
  numeroEjes: number;
  kgPorEje: number;
}

export interface Rueda {
  pulgadasLlanta: number;
  numeracionNeumatico: string;
}

export class Remolque {
  constructor(
    public id: number,
    public familia: string,
    public nombre: string,
    public dimensiones: Dimensiones,
    public mma: MMA,
    public ejes: Ejes,
    public freno: boolean,
    public basculante: boolean,
    public ruedaJockey: boolean,
    public rueda: Rueda,
    public sobrelaterales: TipoSobrelateral,
    public toldo: boolean,
    public tapadera: boolean,
    public apoyaTableros: boolean,
    public urlModelo3D: string
  ) {}
}
