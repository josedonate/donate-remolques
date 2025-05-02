// app/configurador/page.tsx
'use client';

import { useConfigurador } from '@/hooks/useConfigurador';
import ConfiguratorForm from '@/components/configurador/ConfiguratorForm';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Viewer3D = dynamic(() => import('@/components/configurador/Viewer3D'), {
  ssr: false
});

export default function ConfiguradorPage() {
  const {
    configuracion,
    opciones,
    actualizarConfiguracion,
    modelo3D,
    precio,
    peso
  } = useConfigurador();

  return (
    <main className="flex h-screen overflow-hidden pt-18">
      {/* Panel izquierdo */}
      <aside className="w-[420px] bg-purple-600 text-white flex flex-col overflow-y-auto relative">
        <Link href="/" className="text-sm px-4 py-3 underline text-white absolute top-2 left-2 z-10">
          ← Volver a la web
        </Link>

        <div className="pt-12 px-4 pb-24">
          <ConfiguratorForm
            configuracion={configuracion}
            opcionesValidas={opciones}
            onChange={actualizarConfiguracion}
          />

          <div className="mt-6 border-t border-white/30 pt-4">
            <p className="text-lg font-bold">Precio total</p>
            <p className="text-2xl font-bold">€ {precio.toLocaleString('es-ES')},00</p>
            <p className="text-sm text-white/70">Peso estimado: {peso} kg</p>
          </div>
        </div>
      </aside>

      {/* Visualizador 3D */}
      <section className="flex-1 bg-white relative">
        {modelo3D && (
          <Viewer3D modelo={modelo3D} />
        )}
      </section>
    </main>
  );
}
