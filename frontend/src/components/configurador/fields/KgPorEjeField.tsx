import React from 'react';

interface KgPorEjeFieldProps {
  value: number;
  opciones: number[];
  onChange: (nuevoValor: number) => void;
}

const KgPorEjeField: React.FC<KgPorEjeFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Carga máxima por eje</h2>

      <select
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full border px-3 py-2 rounded"
      >
        {opciones.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion} kg/eje
          </option>
        ))}
      </select>
    </div>
  );
};

export default KgPorEjeField;
