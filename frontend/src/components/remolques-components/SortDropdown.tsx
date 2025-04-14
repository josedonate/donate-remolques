"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (newSort: string) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const opciones = [
    { value: "", label: "Por defecto" },
    { value: "referencia_asc", label: "Referencia (A-Z)" },
    { value: "mma_asc", label: "MMA (menor a mayor)" },
    { value: "mma_desc", label: "MMA (mayor a menor)" },
  ];

  const selectedOption = opciones.find((o) => o.value === value);
  const selectedLabel = selectedOption
    ? `Ordenar por: ${selectedOption.label}`
    : "Ordenar por";

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 border rounded bg-white text-sm hover:shadow"
      >
        {selectedLabel}
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
          {opciones.map((op) => (
            <button
              key={op.value}
              onClick={() => {
                onChange(op.value);
                setOpen(false); // cerrar al seleccionar
              }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                op.value === value ? "font-semibold text-blue-600" : ""
              }`}
            >
              {op.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
