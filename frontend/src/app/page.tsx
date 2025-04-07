'use client'

import SectionTag from '@/components/SectionTag'
import { Truck, Wrench, Package } from 'lucide-react'

export default function HomePage() {
  return (
    <section className="flex flex-col gap-6 items-center py-8">
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
  )
}
