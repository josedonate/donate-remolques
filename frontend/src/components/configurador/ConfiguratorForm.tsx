'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useConfigurador } from '@/hooks/useConfigurador';
import { ConfiguracionFormulario } from '@/types/configuracionFormulario';
import ConfiguradorLayout from './ConfiguradorLayout';

import TipoRemolqueField from './fields/TipoRemolqueField';
import DimensionesField from './fields/DimensionesField';
import MMAField from './fields/MMAField';
import NumeroEjesField from './fields/NumeroEjesField';
import KgPorEjeField from './fields/KgPorEjeField';
import FrenoField from './fields/FrenoField';
import RuedasField from './fields/RuedasField';
import SistemaBasculanteField from './fields/SistemaBasculanteField';
import LucesField from './fields/LucesField';
import OpcionalesField from './fields/OpcionalesField';

const ConfiguratorForm = () => {
  const {
    configuracion,
    opcionesValidas,
    pesoKg,
    precio,
    modelo,
    inicializarConfiguracion,
    actualizarConfiguracion,
  } = useConfigurador();

  const [formData, setFormData] = useState<ConfiguracionFormulario | null>(null);

  useEffect(() => {
    inicializarConfiguracion();
  }, []);

  useEffect(() => {
    if (configuracion && opcionesValidas) {
      setFormData(configuracion);
    }
  }, [configuracion, opcionesValidas]);

  const handleChange = <K extends keyof ConfiguracionFormulario>(
    campo: K,
    valor: ConfiguracionFormulario[K]
  ) => {
    if (!formData) return;
    const nuevaConfiguracion = { ...formData, [campo]: valor };
    setFormData(nuevaConfiguracion);
    actualizarConfiguracion(nuevaConfiguracion);
  };

  if (!formData || !opcionesValidas) return <p className="p-8">Cargando configurador...</p>;

  return (
    <ConfiguradorLayout
      resumen={
        <div className="text-sm text-gray-700 space-y-1">
          <p>Peso estimado: <strong>{pesoKg} kg</strong></p>
          <p>Precio total: <strong>{precio.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</strong></p>
          <p className="text-xs text-gray-500">Modelo 3D: <code>{modelo}</code></p>
        </div>
      }
    >
      <div className="space-y-6">
        {/* LOGO */}
        <div className="pt-2">
          <Image
            src="/donate_logo_web.png"
            alt="Logo empresa"
            width={180}
            height={60}
            priority
          />
        </div>

        {/* CAMPOS */}
        <TipoRemolqueField
          value={formData.tipo}
          opciones={opcionesValidas.tipo}
          onChange={(valor) => handleChange('tipo', valor)}
        />

        <DimensionesField
          value={{
            ...formData.dimensiones,
            alto: formData.alto,
          }}
          opciones={{
            dimensiones: opcionesValidas.dimensiones,
            alto: opcionesValidas.alto,
          }}
          onChange={(dim) => {
            handleChange('dimensiones', { ancho: dim.ancho, largo: dim.largo });
            handleChange('alto', dim.alto);
          }}
        />

        <MMAField
          value={formData.mma}
          opciones={opcionesValidas.mma}
          onChange={(valor) => handleChange('mma', valor)}
        />

        <NumeroEjesField
          value={formData.numeroEjes}
          opciones={opcionesValidas.numeroEjes}
          onChange={(valor) => handleChange('numeroEjes', valor)}
        />

        <KgPorEjeField
          value={formData.kgPorEje}
          opciones={opcionesValidas.kgPorEje}
          onChange={(valor) => handleChange('kgPorEje', valor)}
        />

        <FrenoField
          value={formData.freno}
          opciones={opcionesValidas.freno}
          onChange={(valor) => handleChange('freno', valor)}
        />

        <RuedasField
          value={formData.ruedas}
          opciones={{
            pulgadasLlanta: opcionesValidas.ruedas.pulgadasLlanta,
            //numeracionNeumatico: [],
            localizacionRuedas: opcionesValidas.ruedas.localizacionRuedas,
          }}
          onChange={(valor) => handleChange('ruedas', valor)}
        />

        {formData.tipo === 'basculante' && (
          <SistemaBasculanteField
            value={formData.sistemaBasculante}
            opciones={['manual', 'electrico']}
            onChange={(valor) => handleChange('sistemaBasculante', valor)}
          />
        )}

        <LucesField
          value={formData.luces}
          opciones={opcionesValidas.luces}
          onChange={(valor) => handleChange('luces', valor)}
        />

        <OpcionalesField
          value={formData.opcionales}
          opciones={opcionesValidas.opcionales}
          onChange={(valor) => handleChange('opcionales', valor)}
        />
      </div>
    </ConfiguradorLayout>
  );
};

export default ConfiguratorForm;
