import React from 'react';

interface NumeroEjesFieldProps {
  value: 1 | 2;
  opciones: (1 | 2)[];
  onChange: (nuevoValor: 1 | 2) => void;
}

const NumeroEjesField: React.FC<NumeroEjesFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Número de ejes</h2>

      <div className="flex gap-4">
        {opciones.map((opcion) => (
          <label key={opcion} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="numeroEjes"
              value={opcion}
              checked={value === opcion}
              onChange={() => onChange(opcion)}
              className="accent-blue-600"
            />
            <span>{opcion} eje{opcion > 1 ? 's' : ''}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default NumeroEjesField;
