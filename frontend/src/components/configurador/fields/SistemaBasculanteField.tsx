import React from 'react';

interface SistemaBasculanteFieldProps {
  value?: 'manual' | 'electrico';
  opciones: ('manual' | 'electrico')[];
  onChange: (nuevoValor: 'manual' | 'electrico') => void;
}

const SistemaBasculanteField: React.FC<SistemaBasculanteFieldProps> = ({
  value,
  opciones,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Sistema basculante</h2>

      <div className="flex gap-4">
        {opciones.map((opcion) => (
          <label key={opcion} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="sistemaBasculante"
              value={opcion}
              checked={value === opcion}
              onChange={() => onChange(opcion)}
              className="accent-blue-600"
            />
            <span className="capitalize">{opcion}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default SistemaBasculanteField;
