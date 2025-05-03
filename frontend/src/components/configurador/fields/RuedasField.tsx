import React from 'react';

interface RuedasFieldProps {
  value: {
    pulgadasLlanta: string;
    numeracionNeumatico: string;
    localizacionRuedas: 'porfuera' | 'pordebajo';
  };
  opciones: {
    pulgadasLlanta: string[];
    numeracionNeumatico: string[]; // <- este campo no está en el DTO de opciones, pero lo dejamos preparado
    localizacionRuedas: ('porfuera' | 'pordebajo')[];
  };
  onChange: (nuevoValor: {
    pulgadasLlanta: string;
    numeracionNeumatico: string;
    localizacionRuedas: 'porfuera' | 'pordebajo';
  }) => void;
}

const RuedasField: React.FC<RuedasFieldProps> = ({ value, opciones, onChange }) => {
  const handleChange = (campo: keyof typeof value, nuevoValor: string) => {
    onChange({ ...value, [campo]: nuevoValor });
  };

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Ruedas</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pulgadas de llanta</label>
          <select
            value={value.pulgadasLlanta}
            onChange={(e) => handleChange('pulgadasLlanta', e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            {opciones.pulgadasLlanta.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Neumático</label>
          <input
            type="text"
            value={value.numeracionNeumatico}
            onChange={(e) => handleChange('numeracionNeumatico', e.target.value)}
            placeholder="Ej: 155/80"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Localización de ruedas</label>
          <select
            value={value.localizacionRuedas}
            onChange={(e) =>
              handleChange('localizacionRuedas', e.target.value as 'porfuera' | 'pordebajo')
            }
            className="w-full border px-3 py-2 rounded"
          >
            {opciones.localizacionRuedas.map((opcion) => (
              <option key={opcion} value={opcion}>
                {opcion === 'porfuera' ? 'Por fuera' : 'Por debajo'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RuedasField;
