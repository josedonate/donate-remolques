import React from 'react';

interface DimensionesFieldProps {
  value: {
    ancho: number;
    largo: number;
    alto: number;
  };
  opciones: {
    dimensiones: { ancho: number; largo: number }[];
    alto: number[];
  };
  onChange: (nuevoValor: { ancho: number; largo: number; alto: number }) => void;
}

const DimensionesField: React.FC<DimensionesFieldProps> = ({ value, opciones, onChange }) => {
  const handleChange = (campo: 'ancho' | 'largo' | 'alto', nuevoValor: number) => {
    const nuevaConfig = {
      ancho: value.ancho,
      largo: value.largo,
      alto: value.alto,
      [campo]: nuevoValor,
    };

    onChange(nuevaConfig);
  };

  const dimensionesUnicas = opciones.dimensiones.filter(
    (dim, index, self) =>
      self.findIndex((d) => d.ancho === dim.ancho && d.largo === dim.largo) === index
  );

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Dimensiones</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Ancho */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Ancho (cm)</label>
          <select
            value={value.ancho}
            onChange={(e) => handleChange('ancho', parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {[...new Set(dimensionesUnicas.map((d) => d.ancho))].map((ancho) => (
              <option key={ancho} value={ancho}>
                {ancho} cm
              </option>
            ))}
          </select>
        </div>

        {/* Largo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Largo (cm)</label>
          <select
            value={value.largo}
            onChange={(e) => handleChange('largo', parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {[...new Set(dimensionesUnicas.map((d) => d.largo))].map((largo) => (
              <option key={largo} value={largo}>
                {largo} cm
              </option>
            ))}
          </select>
        </div>

        {/* Alto */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Altura (cm)</label>
          <select
            value={value.alto}
            onChange={(e) => handleChange('alto', parseInt(e.target.value))}
            className="w-full border px-3 py-2 rounded"
          >
            {opciones.alto.map((alto) => (
              <option key={alto} value={alto}>
                {alto} cm
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DimensionesField;
