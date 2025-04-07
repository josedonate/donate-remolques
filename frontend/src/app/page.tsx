"use client";

import SectionTag from "@/components/SectionTag";
import RemolquesSlider from "@/components/RemolquesSlider";
import { Caravan, Wrench, Bolt } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12 py-8">
      {/* Accesos rápidos con iconos */}
      <section className="mt-22 flex flex-col items-center gap-10">
        <SectionTag
          title="Remolques"
          description="Catálogo con los modelos estándar"
          href="/remolques"
          Icon={Caravan}
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
          Icon={Bolt}
        />
      </section>

      {/* Slider con remolques reales desde el backend */}
      <section className="flex flex-col items-center gap-6">
        <RemolquesSlider />
      </section>
    </div>
  );
}
