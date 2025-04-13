"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (newSort: string) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const opciones = [
    { value: "", label: "Por defecto" },
    { value: "referencia_asc", label: "Referencia (A-Z)" },
    { value: "mma_asc", label: "MMA (menor a mayor)" },
    { value: "mma_desc", label: "MMA (mayor a menor)" },
  ];

  const selectedLabel = opciones.find((o) => o.value === value)?.label || "Ordenar por";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
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
                setOpen(false);
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
