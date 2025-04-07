'use client'

import SectionTag from '@/components/SectionTag'
import RemolquesSlider from '@/components/RemolquesSlider'
import { Truck, Wrench, Package } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      {/* Accesos rápidos con iconos */}
      <section className="flex flex-col items-center gap-6">
        <SectionTag
          title="Remolques"
          description="Catálogo con los modelos estándar"
          href="/remolques"
          Icon={Truck}
        />
        <SectionTag
          title="Configurador"
          description="Configura tu propio remolque"
          href="/configurador"
          Icon={Wrench}
        />
        <SectionTag
          title="Repuestos"
          description="Accede a la tienda de repuestos"
          href="/repuestos"
          Icon={Package}
        />
      </section>

      {/* Slider con remolques reales desde el backend */}
      <RemolquesSlider />
    </div>
  )
}
