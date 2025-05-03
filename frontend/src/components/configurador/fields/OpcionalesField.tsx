import React from 'react';

interface OpcionalesFieldProps {
  value: {
    sobrelaterales?: 'rejilla' | 'chapa';
    toldo?: boolean;
    apoyatableros?: boolean;
    tapadera?: boolean;
    rampas?: boolean;
  };
  opciones: {
    sobrelaterales: ('rejilla' | 'chapa')[];
    toldo: boolean[];
    apoyatableros: boolean[];
    tapadera: boolean[];
    rampas: boolean[];
  };
  onChange: (nuevoValor: OpcionalesFieldProps['value']) => void;
}

const OpcionalesField: React.FC<OpcionalesFieldProps> = ({ value, opciones, onChange }) => {
  const handleBooleanChange = (campo: keyof OpcionalesFieldProps['value'], nuevoValor: boolean) => {
    onChange({ ...value, [campo]: nuevoValor });
  };

  const handleSobrelateralesChange = (nuevoValor: 'rejilla' | 'chapa' | '') => {
    onChange({ ...value, sobrelaterales: nuevoValor || undefined });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Opcionales</h2>

      {/* Sobrelaterales */}
      {opciones.sobrelaterales.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700">Sobrelaterales</label>
          <select
            value={value.sobrelaterales || ''}
            onChange={(e) =>
              handleSobrelateralesChange(e.target.value as 'rejilla' | 'chapa' | '')
            }
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Ninguno</option>
            {opciones.sobrelaterales.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion === 'rejilla' ? 'Rejilla' : 'Chapa'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Booleanos */}
      {(['toldo', 'apoyatableros', 'tapadera', 'rampas'] as const).map((campo) => {
        const disponibles = opciones[campo];
        if (!disponibles.includes(true)) return null;

        return (
          <div key={campo} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={campo}
              checked={value[campo] ?? false}
              onChange={(e) => handleBooleanChange(campo, e.target.checked)}
              className="accent-blue-600"
            />
            <label htmlFor={campo} className="text-sm">
              {campo.charAt(0).toUpperCase() + campo.slice(1)}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default OpcionalesField;
