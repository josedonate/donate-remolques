import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

export type MMA = "<=750kg" | "(750kg-3500kg]";
export type TipoSobrelateral = "chapa" | "rejilla"; // ✅ sin "ninguno"

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

  @Column({ type: "enum", enum: ["<=750kg", "(750kg-3500kg]"] })
  mma!: MMA;

  @Column({ type: "jsonb" })
  ejes!: Ejes;

  @Column()
  freno!: boolean;

  @Column()
  basculante!: boolean;

  @Column()
  ruedaJockey!: boolean;

  @Column({ type: "jsonb" })
  rueda!: Rueda;

  // 🟡 Opcionales
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
}
