'use client';

import { ReactNode } from 'react';


interface ConfiguradorLayoutProps {
  children: ReactNode; // Secciones configurables
  resumen: ReactNode;  // Peso y precio (bloque blanco)
  visualizador?: ReactNode; // Visualizador 3D (placeholder por ahora)
}

const ConfiguradorLayout: React.FC<ConfiguradorLayoutProps> = ({
  children,
  resumen,
  visualizador,
}) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Panel izquierdo (configuración) */}
      <div className="flex flex-col w-[400px] bg-blue-100 border-r border-gray-300">
        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
          {children}
        </div>

        {/* Bloque fijo blanco */}
        <div className="bg-white p-4 border-t border-gray-300 shadow-sm">
          {resumen}
        </div>
      </div>

      {/* Panel derecho (visualizador 3D) */}
      <div className="flex-1 bg-white relative">
        {visualizador ? (
          visualizador
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Visualizador 3D (próximamente)
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfiguradorLayout;
