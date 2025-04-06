import { describe, it, expect } from 'vitest';
import { remolqueSchema } from '../../validators/remolque.validator';

describe("🧪 Validación con Zod - remolqueSchema", () => {
    const base = {
      familia: "Test",
      referencia: "REF-123",
      dimensiones: { ancho: 180, largo: 300 },
      tara: 250,
      mma: 750,
      ejes: { numeroEjes: 1, kgPorEje: 750 },
      rueda: {
        pulgadasLlanta: 13,
        numeracionNeumatico: "195/70R13",
        localizacionRuedas: "porDebajo",
      },
      freno: false,
      basculante: true,
      ruedaJockey: true,
      urlModelo3D: "https://ejemplo.com/modelo.glb",
    };
  
    it("✅ Pasa validación con todos los datos requeridos", () => {
      const parsed = remolqueSchema.parse(base);
      expect(parsed.familia).toBe("Test");
    });
  
    it("❌ Falla si falta un campo obligatorio (familia)", () => {
      const { familia, ...rest } = base;
      expect(() => remolqueSchema.parse(rest)).toThrow(/familia/);
    });
  
    it("❌ Falla si MMA no está en la lista permitida", () => {
      const invalido = { ...base, mma: 800 };
      expect(() => remolqueSchema.parse(invalido)).toThrow(/Invalid literal value/);
    });
  
    it("❌ Falla si hay una clave no reconocida en dimensiones", () => {
      const invalido = {
        ...base,
        dimensiones: { ...base.dimensiones, extra: 123 },
      };
      expect(() => remolqueSchema.parse(invalido)).toThrow(/Unrecognized key/);
    });
  
    it("✅ Pasa con campos opcionales presentes", () => {
      const opcional = {
        ...base,
        sobrelaterales: "rejilla",
        toldo: true,
        tapadera: true,
        rampas: true,
        apoyaTableros: false,
      };
      const parsed = remolqueSchema.parse(opcional);
      expect(parsed.sobrelaterales).toBe("rejilla");
    });
  
    it("✅ Pasa aunque los campos opcionales no estén definidos", () => {
      const parsed = remolqueSchema.parse(base);
      expect(parsed.rampas).toBeUndefined();
      expect(parsed.sobrelaterales).toBeUndefined();
    });
  });