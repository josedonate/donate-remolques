import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Configurador service listening on port ${PORT}`);
});
