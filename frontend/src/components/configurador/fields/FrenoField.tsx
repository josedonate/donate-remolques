import React from 'react';

interface FrenoFieldProps {
  value: boolean;
  opciones: boolean[];
  onChange: (nuevoValor: boolean) => void;
}

const FrenoField: React.FC<FrenoFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Sistema de freno</h2>

      <div className="flex gap-4">
        {opciones.map((opcion) => (
          <label key={String(opcion)} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="freno"
              value={String(opcion)}
              checked={value === opcion}
              onChange={() => onChange(opcion)}
              className="accent-blue-600"
            />
            <span>{opcion ? 'Con freno' : 'Sin freno'}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FrenoField;
