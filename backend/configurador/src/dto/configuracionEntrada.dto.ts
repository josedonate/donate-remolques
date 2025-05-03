export interface ConfiguracionEntradaDTO {
  tipo: 'normal' | 'basculante';
  dimensiones: { ancho: number; largo: number };
  alto: number;
  mma: number;
  numeroEjes: 1 | 2;
  kgPorEje: number;
  freno: boolean;
  ruedas: {
    pulgadasLlanta: string;
    numeracionNeumatico: string;
    localizacionRuedas: 'porfuera' | 'pordebajo';
  };
  sistemaBasculante?: 'manual' | 'electrico';
  luces: 'estandar' | 'led';
  opcionales?: {
    sobrelaterales?: 'rejilla' | 'chapa';
    toldo?: boolean;
    apoyatableros?: boolean;
    tapadera?: boolean;
    rampas?: boolean;
  };
}
