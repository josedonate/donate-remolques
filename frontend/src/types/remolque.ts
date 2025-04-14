export interface RemolqueTarjetaDTO {
    id: number
    referencia: string
    familia: string
    mma: number
    dimensiones: {
      ancho: number
      largo: number
      alto?: number
    }
    ejes: {
      numeroEjes: number
    }
    urlImagen: string
  }
  
  export interface RemolqueDTO {
    id: number;
    referencia: string;
    familia: string;
    mma: number;
    tara: number;
    categoria: 'O1' | 'O2';
    dimensiones: {
      ancho: number;
      largo: number;
      alto?: number;
    };
    ejes: {
      numeroEjes: number;
      kgPorEje: number;
    };
    rueda: {
      pulgadasLlanta: number;
      numeracionNeumatico: string;
      localizacionRuedas: 'porFuera' | 'porDebajo';
    };
    freno: boolean;
    basculante: boolean;
    ruedaJockey: boolean;
    sobrelaterales?: 'chapa' | 'rejilla';
    toldo?: boolean;
    tapadera?: boolean;
    rampas?: boolean;
    apoyaTableros?: boolean;
    urlModelo3D: string;
    descripcion?: string;
  }
  