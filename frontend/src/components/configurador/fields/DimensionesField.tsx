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
  const handleComboChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [largo, ancho] = e.target.value.split('x').map(Number);
    onChange({ ...value, largo, ancho });
  };

  const handleAltoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...value, alto: parseInt(e.target.value) });
  };

  const selectedKey = `${value.largo}x${value.ancho}`;

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Dimensiones</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Combo Ancho x Largo */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Largo x Ancho</label>
          <select
            value={selectedKey}
            onChange={handleComboChange}
            className="w-full border px-3 py-2 rounded"
          >
            {opciones.dimensiones.map(({ ancho, largo }) => {
              const key = `${largo}x${ancho}`;
              return (
                <option key={key} value={key}>
                  {largo}cm x {ancho}cm
                </option>
              );
            })}
          </select>
        </div>

        {/* Alto separado */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Alto (cm)</label>
          <select
            value={value.alto}
            onChange={handleAltoChange}
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
