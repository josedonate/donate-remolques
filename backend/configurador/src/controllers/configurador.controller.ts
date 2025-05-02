// backend/configurador/src/controllers/configurador.controller.ts

import { Request, Response, Router } from 'express';
import { procesarConfiguracion } from '../services/validacionConfiguracion.service';
import { ConfiguracionEntradaDTO } from '../dto/configuracionEntrada.dto';
import { CONFIGURACION_PREDETERMINADA } from '../data/RemolquePredeterminado';

export const getConfiguracionInicial = (req: Request, res: Response) => {
  try {
    const respuesta = procesarConfiguracion(CONFIGURACION_PREDETERMINADA);
    res.json(respuesta);
  } catch (err) {
    console.error('Error al generar configuración inicial:', err);
    res.status(500).json({ error: 'Error al generar configuración inicial' });
  }
};

export const postConfiguracion = (req: Request, res: Response) => {
  try {
    const configuracionUsuario = req.body as ConfiguracionEntradaDTO;
    const respuesta = procesarConfiguracion(configuracionUsuario);
    res.json(respuesta);
  } catch (err) {
    console.error('Error al procesar configuración:', err);
    res.status(400).json({ error: 'Configuración inválida o incoherente' });
  }
};