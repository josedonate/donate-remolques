import React from 'react';

interface MMAFieldProps {
  value: number;
  opciones: number[];
  onChange: (nuevoValor: number) => void;
}

const MMAField: React.FC<MMAFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">MMA (Masa Máxima Autorizada)</h2>

      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full border px-3 py-2 rounded"
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion} kg
          </option>
        ))}
      </select>
    </div>
  );
};

export default MMAField;
