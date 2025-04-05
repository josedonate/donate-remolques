import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
} from "typeorm";

export type LocalizacionRuedas = "porFuera" | "porDebajo";
export type TipoSobrelateral = "chapa" | "rejilla";

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
  localizacionRuedas: LocalizacionRuedas;
}

@Entity({ name: "remolques" })
export class Remolque {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  familia!: string;

  @Column({ unique: true })
  referencia!: string;

  @Column({ type: "jsonb" })
  dimensiones!: Dimensiones;

  @Column()
  tara!: number;

  @Column()
  mma!: number;

  // Propiedad calculada tras cargar de BBDD
  categoria!: "O1" | "O2";

  @Column({ type: "jsonb" })
  ejes!: Ejes;

  @Column({ type: "jsonb" })
  rueda!: Rueda;

  @Column()
  freno!: boolean;

  @Column()
  basculante!: boolean;

  @Column()
  ruedaJockey!: boolean;

  // Opcionales
  @Column({ type: "enum", enum: ["chapa", "rejilla"], nullable: true })
  sobrelaterales?: TipoSobrelateral;

  @Column({ nullable: true })
  toldo?: boolean;

  @Column({ nullable: true })
  tapadera?: boolean;

  @Column({ nullable: true })
  rampas?: boolean;

  @Column({ nullable: true })
  apoyaTableros?: boolean;

  @Column()
  urlModelo3D!: string;

  @AfterLoad()
  setCategoria() {
    this.categoria = this.mma <= 750 ? "O1" : "O2";
  }
}
