import { useState } from 'react';
import { ConfiguracionFormulario } from '@/types/configuracionFormulario';
import { opcionesValidasRespuestaDTO } from '@/types/configuracionRespuesta.dto';
import { obtenerConfiguracionInicial, enviarConfiguracion } from '@/services/configuradorService';

export const useConfigurador = () => {
  const [configuracion, setConfiguracion] = useState<ConfiguracionFormulario | null>(null);
  const [opcionesValidas, setOpcionesValidas] = useState<opcionesValidasRespuestaDTO | null>(null);
  const [precio, setPrecio] = useState<number>(0);
  const [pesoKg, setPesoKg] = useState<number>(0);
  const [modelo, setModelo] = useState<string>('');

  const inicializarConfiguracion = async () => {
    try {
      const respuesta = await obtenerConfiguracionInicial();
      setConfiguracion(respuesta.configuracionAdaptada);
      setOpcionesValidas(respuesta.opcionesValidas);
      setPrecio(respuesta.precioTotal);
      setPesoKg(respuesta.pesoEstimadoKg);
      setModelo(respuesta.modelo);
    } catch (error) {
      console.error('Error al cargar la configuración inicial:', error);
    }
  };

  const actualizarConfiguracion = async (nueva: ConfiguracionFormulario) => {
    try {
      const respuesta = await enviarConfiguracion(nueva);
      if (JSON.stringify(respuesta.configuracionAdaptada) !== JSON.stringify(configuracion)) {
        setConfiguracion(respuesta.configuracionAdaptada);
        setOpcionesValidas(respuesta.opcionesValidas);
        setPrecio(respuesta.precioTotal);
        setPesoKg(respuesta.pesoEstimadoKg);
        setModelo(respuesta.modelo);
      }
    } catch (error) {
      console.error('Error al actualizar configuración:', error);
    }
  };

  return {
    configuracion,
    opcionesValidas,
    precio,
    pesoKg,
    modelo,
    inicializarConfiguracion,
    actualizarConfiguracion,
  };
};
