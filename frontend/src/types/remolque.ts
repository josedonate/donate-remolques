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
  }
  