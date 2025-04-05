import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm";

export type MMA = "<=750kg" | "(750kg-3500kg]";
export type TipoSobrelateral = "ninguno" | "chapa" | "rejilla";

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
  @PrimaryGeneratedColumn() // 👈 Esto genera un número autoincremental
  id!: number;

  @Column()
  familia!: string;

  @Column()
  nombre!: string;

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

  @Column({ type: "enum", enum: ["ninguno", "chapa", "rejilla"] })
  sobrelaterales!: TipoSobrelateral;

  @Column()
  toldo!: boolean;

  @Column()
  tapadera!: boolean;

  @Column()
  apoyaTableros!: boolean;

  @Column()
  urlModelo3D!: string;
}
