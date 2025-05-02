'use client';

import { ConfiguracionEntradaDTO } from '@/types/ConfiguracionEntradaDTO';
import { useRef, useState } from 'react';
import { DIMENSIONES_DISPONIBLES } from '@/data/dimensiones';

interface Props {
  configuracion: ConfiguracionEntradaDTO;
  opcionesValidas: Partial<Record<keyof ConfiguracionEntradaDTO, unknown>>;
  onChange: (config: ConfiguracionEntradaDTO) => void;
  precioTotal: number;
  pesoEstimadoKg: number;
}

type CampoConfiguracion = keyof ConfiguracionEntradaDTO | 'dimensiones';

export default function ConfiguratorForm({
  configuracion,
  opcionesValidas,
  onChange,
  precioTotal,
  pesoEstimadoKg
}: Props) {
  const [seccionActiva, setSeccionActiva] = useState<CampoConfiguracion | null>(null);
  const seccionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const secciones: { key: CampoConfiguracion; label: string }[] = [
    { key: 'dimensiones', label: 'Dimensiones (largo x ancho)' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'mma', label: 'Masa Máxima Autorizada' },
    { key: 'numeroEjes', label: 'Número de ejes' },
    { key: 'kgPorEje', label: 'Kg por eje' },
    { key: 'freno', label: 'Freno' },
    { key: 'luces', label: 'Luces' },
    { key: 'ruedas', label: 'Ruedas' },
    { key: 'sistemaBasculante', label: 'Sistema basculante' },
    { key: 'opcionales', label: 'Opcionales' }
  ];

  const handleSeleccion = <K extends CampoConfiguracion>(
    campo: K,
    valor: K extends 'dimensiones'
      ? ConfiguracionEntradaDTO['dimensiones']
      : ConfiguracionEntradaDTO[K]
  ) => {
    const nueva: ConfiguracionEntradaDTO = structuredClone(configuracion);

    if (campo === 'dimensiones') {
      nueva.dimensiones = valor as ConfiguracionEntradaDTO['dimensiones'];
    } else {
      switch (campo) {
        case 'tipo':
        case 'mma':
        case 'numeroEjes':
        case 'kgPorEje':
        case 'freno':
        case 'luces':
        case 'sistemaBasculante':
          nueva[campo] = valor;
          break;
        case 'ruedas':
          nueva.ruedas = {
            ...nueva.ruedas,
            ...(valor as Partial<typeof nueva.ruedas>)
          };
          break;
        case 'opcionales':
          nueva.opcionales = {
            ...nueva.opcionales,
            ...(valor as Partial<NonNullable<typeof nueva.opcionales>>)
          };
          break;
      }
    }

    onChange(nueva);
    setSeccionActiva(null);
  };

  return (
    <div className="relative h-full flex flex-col justify-between bg-purple-700 text-white">
      <div className="overflow-y-auto px-4 pt-6 pb-32">
        <p className="text-sm underline cursor-pointer mb-6">← Volver a la web</p>

        {secciones.map(({ key, label }) => (
          <div
            key={key}
            className="border-b border-white/30 py-2 relative"
            ref={(el) => {
              seccionRefs.current[key] = el;
            }}
          >
            <button
              onClick={() => setSeccionActiva(seccionActiva === key ? null : key)}
              className="w-full text-left"
            >
              <p className="font-semibold">{label}</p>
              <p className="text-sm text-white/80">{mostrarValorSeleccionado(configuracion, key)}</p>
            </button>

            {seccionActiva === key && (
              <div className="absolute left-full ml-2 bg-blue-100 text-black rounded shadow-lg p-4 z-50 w-64 max-h-[300px] overflow-y-auto">
                {renderOpciones(key, configuracion, opcionesValidas[key as keyof ConfiguracionEntradaDTO], handleSeleccion)}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full bg-white text-black px-4 py-4 border-t border-white/30">
        <p className="text-sm">Precio total</p>
        <p className="text-2xl font-bold">€ {(precioTotal ?? 0).toFixed(2)}</p>
        <p className="text-sm text-gray-600">Peso estimado: {pesoEstimadoKg ?? 0} kg</p>
      </div>
    </div>
  );
}

function renderOpciones<K extends CampoConfiguracion>(
  campo: K,
  configuracion: ConfiguracionEntradaDTO,
  opciones: unknown,
  onSelect: (
    campo: K,
    valor: K extends 'dimensiones' ? ConfiguracionEntradaDTO['dimensiones'] : ConfiguracionEntradaDTO[K]
  ) => void
) {
  if (campo === 'dimensiones') {
    return DIMENSIONES_DISPONIBLES.map((dim) => {
      const isChecked =
        configuracion.dimensiones.largo === dim.largo &&
        configuracion.dimensiones.ancho === dim.ancho;

      return (
        <label key={`${dim.largo}x${dim.ancho}`} className="block py-1">
          <input
            type="radio"
            name="dimensiones"
            checked={isChecked}
            onChange={() =>
              onSelect('dimensiones' as K, {
                largo: dim.largo,
                ancho: dim.ancho,
                alto: configuracion.dimensiones.alto
              } as ConfiguracionEntradaDTO['dimensiones'])
            }
            className="mr-2"
          />
          {`${dim.largo} x ${dim.ancho} cm`}
        </label>
      );
    });
  }

  if (!opciones) return <p className="text-sm text-gray-500">Sin opciones disponibles</p>;

  if (Array.isArray(opciones)) {
    return opciones.map((op) => {
      const isChecked = configuracion[campo as keyof ConfiguracionEntradaDTO] === op;
      return (
        <label key={String(op)} className="block py-1">
          <input
            type="radio"
            name={String(campo)}
            checked={isChecked}
            onChange={() => onSelect(campo, op as any)}
            className="mr-2"
          />
          {String(op)}
        </label>
      );
    });
  }

  if (typeof opciones === 'object') {
    const subopciones = opciones as Record<string, (string | boolean)[]>;

    return Object.entries(subopciones).map(([subcampo, valores]) => (
      <div key={subcampo} className="mb-3">
        <p className="text-sm font-semibold mb-1 capitalize">{subcampo}</p>
        {valores.map((v) => {
          const isChecked =
            campo === 'ruedas'
              ? configuracion.ruedas[subcampo as keyof typeof configuracion.ruedas] === v
              : configuracion.opcionales?.[subcampo as keyof NonNullable<typeof configuracion.opcionales>] === v;

          return (
            <label key={String(v)} className="block text-sm">
              <input
                type="radio"
                name={`${campo}.${subcampo}`}
                checked={isChecked}
                onChange={() =>
                  onSelect(campo, { [subcampo]: v } as any)
                }
                className="mr-2"
              />
              {String(v)}
            </label>
          );
        })}
      </div>
    ));
  }

  return null;
}

function mostrarValorSeleccionado(
  config: ConfiguracionEntradaDTO,
  campo: CampoConfiguracion
): string {
  if (campo === 'dimensiones') {
    return `${config.dimensiones.largo} x ${config.dimensiones.ancho} cm`;
  }

  const val = config[campo as keyof ConfiguracionEntradaDTO];

  if (typeof val === 'boolean' || typeof val === 'string' || typeof val === 'number') {
    return String(val);
  }

  if (campo === 'ruedas') {
    return `${config.ruedas.localizacionRuedas} - ${config.ruedas.pulgadasLlanta}"`;
  }

  if (campo === 'opcionales') {
    const opc = config.opcionales;
    if (!opc) return 'Ninguno';
    const activos = Object.entries(opc)
      .filter(([, v]) => Boolean(v))
      .map(([k, v]) => (typeof v === 'string' ? v : k));
    return activos.length > 0 ? activos.join(', ') : 'Ninguno';
  }

  return '-';
}
