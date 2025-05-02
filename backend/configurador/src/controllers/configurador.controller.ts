import { Request, Response } from 'express';
import { configuracionSchema } from '../validators/configuracionSchema';
import { validarConfiguracionRemolque } from '../validators/reglasRemolque';
import { obtenerModelo3D } from '../utils/modelo3D';
import { calcularPrecioRemolque } from '../services/calculoPrecio.service';

export const procesarConfiguracion = async (req: Request, res: Response) => {
  try {
    // 🧪 Validación de formato
    const parsed = configuracionSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({
        message: 'Error de validación de formato',
        issues: parsed.error.errors
      });
      return;
    }

    const configuracion = parsed.data;

    // 📏 Validación de reglas de negocio
    const resultadoValidacion = validarConfiguracionRemolque(configuracion);

    // 🧱 Selección de modelo 3D
    const modelo3D = resultadoValidacion.configuracionValida
      ? obtenerModelo3D(configuracion)
      : null;

    // 💰 Cálculo de precio y peso estimado
    const { precioTotal, pesoEstimadoKg } = resultadoValidacion.configuracionValida
      ? calcularPrecioRemolque(configuracion)
      : { precioTotal: 0, pesoEstimadoKg: 0 };

    // 📦 Respuesta completa
    res.status(200).json({
      ...resultadoValidacion,
      modelo3D,
      precioTotal,
      pesoEstimadoKg
    });
    return;
  } catch (error) {
    console.error('Error en el controlador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
    return;
  }
};
