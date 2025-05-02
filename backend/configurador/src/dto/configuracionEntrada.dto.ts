// dto/configuracionEntrada.dto.ts
export interface ConfiguracionEntradaDTO {
  tipo: 'Normal' | 'Basculante';
  dimensiones: {
    ancho: number;
    largo: number;
    alto: number;
  };
  mma: number;
  numeroEjes: 1 | 2;
  kgPorEje: number;
  freno: boolean;
  ruedas: {
    pulgadasLlanta: string;
    numeracionNeumatico: string;
    localizacionRuedas: 'porFuera' | 'porDebajo';
  };
  
  sistemaBasculante?: 'Manual' | 'Eléctrico';
  luces: 'Estándar' | 'Led';
  opcionales?: {
    sobrelaterales?: 'Rejilla' | 'Chapa';
    toldo?: boolean;
    apoyatableros?: boolean;
    tapadera?: boolean;
    rampas?: boolean;
  };
}
