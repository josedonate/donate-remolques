import "reflect-metadata";
import dotenv from 'dotenv';
dotenv.config();
import { AppDataSource } from "./data-source";
import app from './app';

const PORT = process.env.PORT || 3001;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");

    app.listen(PORT || 3001, () => {
      console.log("🚀 Servidor corriendo en el puerto 3001");
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err);
  });
