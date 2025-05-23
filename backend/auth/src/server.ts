import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ? Number(process.env.PORT) : 3002;

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Auth corriendo en puerto ${PORT}`);
});
