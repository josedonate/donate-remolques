export const FAMILIAS = [
  "Alfa", "Racing", "Camper", "Delta", "Hydro",
  "Combust", "Termic", "Caza", "Explorer", "Discovery",
  "Ekus", "Transcar", "Transmak", "Plataforma", "Nautica"
] as const;

export type FamiliaRemolque = typeof FAMILIAS[number];

export const USOS = [
  "Utilitario", "Animales", "Construccion", "Isotermos", "Combustible", "Portavehiculos",
  "Plataforma", "Limpieza", "Jardineria", "Agricultura", "Náutica"
] as const;

export type UsoRemolque = typeof USOS[number];

// Relación muchos a muchos
export const USOS_POR_FAMILIA: Record<FamiliaRemolque, UsoRemolque[]> = {
  Alfa: ["Construccion", "Utilitario", "Jardineria", "Agricultura"],
  Racing: ["Portavehiculos"],
  Camper: ["Utilitario"],
  Delta: ["Utilitario", "Construccion", "Agricultura", "Jardineria"],
  Hydro: ["Limpieza"],
  Combust: ["Combustible"],
  Termic: ["Isotermos"],
  Caza: ["Animales"],
  Explorer: ["Utilitario", "Construccion", "Jardineria", "Agricultura"],
  Discovery: ["Utilitario", "Construccion", "Jardineria", "Agricultura"],
  Ekus: ["Animales"],
  Transcar: ["Portavehiculos"],
  Transmak: ["Portavehiculos"],
  Plataforma: ["Plataforma"],
  Nautica: ["Náutica"]
};
