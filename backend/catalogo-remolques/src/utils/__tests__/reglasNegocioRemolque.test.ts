import { describe, it, expect } from 'vitest';
import { aplicarReglasNegocioRemolque } from '../reglasNegocioRemolque';
import { ReglaNegocioError } from '../../errors/ReglaNegocioError';
import { RemolqueInput } from '../../validators/remolque.validator';

const baseRemolque: RemolqueInput = {
  familia: "Test",
  referencia: "REF-001",
  dimensiones: { ancho: 200, largo: 300 },
  tara: 300,
  mma: 1300,
  ejes: { numeroEjes: 2, kgPorEje: 650 },
  rueda: {
    pulgadasLlanta: 13,
    numeracionNeumatico: "195/70R13",
    localizacionRuedas: "porDebajo",
  },
  freno: true,
  basculante: false,
  ruedaJockey: true,
  urlModelo3D: "https://ejemplo.com/remolque.glb"
};

describe("Validación de reglas de negocio - aplicarReglasNegocioRemolque", () => {
  it("✅ No lanza error si el remolque cumple todas las reglas", () => {
    expect(() => aplicarReglasNegocioRemolque(baseRemolque)).not.toThrow();
  });

  it("❌ MMA no válida para categoría O2", () => {
    const remolque = { ...baseRemolque, mma: 800 } as unknown as RemolqueInput;
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(ReglaNegocioError);
  });

  it("❌ Largo fuera de rango (muy corto)", () => {
    const remolque = {
      ...baseRemolque,
      dimensiones: { ...baseRemolque.dimensiones, largo: 90 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/largo/);
  });

  it("❌ Largo fuera de rango (muy largo)", () => {
    const remolque = {
      ...baseRemolque,
      dimensiones: { ...baseRemolque.dimensiones, largo: 610 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/largo/);
  });

  it("❌ Largo < 225cm debe tener 1 eje", () => {
    const remolque = {
      ...baseRemolque,
      dimensiones: { ...baseRemolque.dimensiones, largo: 200 },
      ejes: { numeroEjes: 2, kgPorEje: 500 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/1 eje/);
  });

  it("❌ Largo > 250cm debe tener 2 ejes", () => {
    const remolque = {
      ...baseRemolque,
      dimensiones: { ...baseRemolque.dimensiones, largo: 300 },
      ejes: { numeroEjes: 1, kgPorEje: 750 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/2 ejes/);
  });

  it("❌ MMA > 750kg sin freno", () => {
    const remolque = { ...baseRemolque, freno: false };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/freno/);
  });

  it("❌ MMA > 750kg con solo 1 eje", () => {
    const remolque = {
      ...baseRemolque,
      ejes: { numeroEjes: 1, kgPorEje: 1300 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/2 ejes/);
  });

  it("❌ Categoría O1 con ancho < 100cm", () => {
    const remolque = {
      ...baseRemolque,
      mma: 500 as 500,
      dimensiones: { ...baseRemolque.dimensiones, ancho: 90 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/ancho mínimo/);
  });

  it("❌ Categoría O2 con ancho < 140cm", () => {
    const remolque = {
      ...baseRemolque,
      mma: 1300 as 1300,
      dimensiones: { ...baseRemolque.dimensiones, ancho: 130 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/ancho mínimo/);
  });

  it("❌ Categoría O1 con ancho > 200cm", () => {
    const remolque = {
      ...baseRemolque,
      mma: 750 as 750,
      dimensiones: { ...baseRemolque.dimensiones, ancho: 210 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/ancho máximo/);
  });

  it("❌ Categoría O2 con ancho > 255cm", () => {
    const remolque = {
      ...baseRemolque,
      mma: 1300 as 1300,
      dimensiones: { ...baseRemolque.dimensiones, ancho: 300 }
    };
    expect(() => aplicarReglasNegocioRemolque(remolque)).toThrow(/ancho máximo/);
  });
});
