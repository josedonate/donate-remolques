import React from 'react';

interface TipoRemolqueFieldProps {
  value: 'normal' | 'basculante';
  opciones: ('normal' | 'basculante')[];
  onChange: (nuevoValor: 'normal' | 'basculante') => void;
}

const TipoRemolqueField: React.FC<TipoRemolqueFieldProps> = ({ value, opciones, onChange }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Tipo de remolque</h2>
      <div className="flex flex-col gap-2">
        {opciones.map((opcion) => (
          <label key={opcion} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="tipoRemolque"
              value={opcion}
              checked={value === opcion}
              onChange={() => onChange(opcion)}
              className="accent-blue-600"
            />
            <span className="capitalize">{opcion === 'normal' ? 'Normal' : 'Basculante'}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default TipoRemolqueField;
