// src/hooks/useConfigurador.ts
import { useState, useEffect } from 'react';
import axios from '@/lib/axiosConfigurador';
import { CONFIGURACION_INICIAL } from '@/data/configuracionInicial';
import { ConfiguradorResponse } from '@/types/ConfiguradorResponse';

export const useConfigurador = () => {
  const [configuracion, setConfiguracion] = useState(CONFIGURACION_INICIAL);
  const [opciones, setOpciones] = useState({});
  const [modelo3D, setModelo3D] = useState<string | null>(null);
  const [precio, setPrecio] = useState(0);
  const [peso, setPeso] = useState(0);

  const fetchConfiguracion = async (nuevaConfig = configuracion) => {
    try {
      const res = await axios.post<ConfiguradorResponse>('/', nuevaConfig);
      setConfiguracion(res.data.configuracionAdaptada);
      setOpciones(res.data.opcionesValidas);
      setModelo3D(res.data.modelo3D);
      setPrecio(res.data.precioTotal);
      setPeso(res.data.pesoEstimadoKg);
    } catch (err) {
      console.error('Error al obtener configuración:', err);
    }
  };

  useEffect(() => {
    fetchConfiguracion(CONFIGURACION_INICIAL);
  }, []);

  return {
    configuracion,
    opciones,
    modelo3D,
    precio,
    peso,
    actualizarConfiguracion: fetchConfiguracion
  };
};
