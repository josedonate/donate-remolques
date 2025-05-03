import React from 'react';

interface LucesFieldProps {
  value: 'estandar' | 'led';
  opciones: ('estandar' | 'led')[];
  onChange: (nuevoValor: 'estandar' | 'led') => void;
}

const LucesField: React.FC<LucesFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Tipo de luces</h2>

      <div className="flex gap-4">
        {opciones.map((opcion) => (
          <label key={opcion} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="luces"
              value={opcion}
              checked={value === opcion}
              onChange={() => onChange(opcion)}
              className="accent-blue-600"
            />
            <span>{opcion === 'led' ? 'LED' : 'Estándar'}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default LucesField;
