"use client";

import { useEffect, useState } from "react";
import { ConfiguracionFormulario } from "@/types/configuracionFormulario";
import { useConfigurador } from "@/hooks/useConfigurador";

import TipoRemolqueField from "./fields/TipoRemolqueField";
import DimensionesField from "./fields/DimensionesField";
import MMAField from "./fields/MMAField";
import NumeroEjesField from "./fields/NumeroEjesField";
import KgPorEjeField from "./fields/KgPorEjeField";
import FrenoField from "./fields/FrenoField";
import RuedasField from "./fields/RuedasField";
import SistemaBasculanteField from "./fields/SistemaBasculanteField";
import LucesField from "./fields/LucesField";
import OpcionalesField from "./fields/OpcionalesField";

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

  const [formData, setFormData] = useState<ConfiguracionFormulario | null>(
    null
  );

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
  if (!formData || !opcionesValidas) return <p>Cargando configurador...</p>;
  return (
    <form className="space-y-6 max-w-4xl mx-auto py-6">
      <TipoRemolqueField
        value={formData.tipo}
        opciones={opcionesValidas.tipo}
        onChange={(valor) => handleChange("tipo", valor)}
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
        onChange={(nuevaDimension) => {
          handleChange("dimensiones", {
            ancho: nuevaDimension.ancho,
            largo: nuevaDimension.largo,
          });
          handleChange("alto", nuevaDimension.alto);
        }}
      />

      <MMAField
        value={formData.mma}
        opciones={opcionesValidas.mma}
        onChange={(valor) => handleChange("mma", valor)}
      />

      <NumeroEjesField
        value={formData.numeroEjes}
        opciones={opcionesValidas.numeroEjes}
        onChange={(valor) => handleChange("numeroEjes", valor)}
      />

      <KgPorEjeField
        value={formData.kgPorEje}
        opciones={opcionesValidas.kgPorEje}
        onChange={(valor) => handleChange("kgPorEje", valor)}
      />

      <FrenoField
        value={formData.freno}
        opciones={opcionesValidas.freno}
        onChange={(valor) => handleChange("freno", valor)}
      />

      <RuedasField
        value={formData.ruedas}
        opciones={{
          pulgadasLlanta: opcionesValidas.ruedas.pulgadasLlanta,
          //numeracionNeumatico: [], // editable libre, backend no define opciones válidas
          localizacionRuedas: opcionesValidas.ruedas.localizacionRuedas,
        }}
        onChange={(valor) => handleChange("ruedas", valor)}
      />

      {formData.tipo === "basculante" && (
        <SistemaBasculanteField
          value={formData.sistemaBasculante}
          opciones={["manual", "electrico"]}
          onChange={(valor) => handleChange("sistemaBasculante", valor)}
        />
      )}

      <LucesField
        value={formData.luces}
        opciones={opcionesValidas.luces}
        onChange={(valor) => handleChange("luces", valor)}
      />

      <OpcionalesField
        value={formData.opcionales}
        opciones={opcionesValidas.opcionales}
        onChange={(valor) => handleChange("opcionales", valor)}
      />

      <div className="pt-6 border-t text-sm text-gray-600 space-y-1">
        <p>Peso estimado: {pesoKg} kg</p>
        <p>Precio total: {precio} €</p>
        <p>
          Modelo 3D a mostrar: <code>{modelo}</code>
        </p>
      </div>
    </form>
  );
};

export default ConfiguratorForm;
