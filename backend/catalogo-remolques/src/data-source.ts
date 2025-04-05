import { DataSource } from "typeorm";
import { Remolque } from "./models/Remolque";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASS),
  database: String(process.env.DB_NAME),
  schema: "catalogo",
  synchronize: true, // solo para desarrollo. Para producción, debería usar synchronize: false y migraciones controladas.
  logging: true,
  entities: [Remolque],
});


