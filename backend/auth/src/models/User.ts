import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  schema: process.env.DB_SCHEMA || "auth",
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  /**
   * Roles en formato array sencillo, p. ej. ['user'], ['admin']
   */
  @Column("simple-array", { default: "user" })
  roles!: string[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
