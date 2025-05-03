"use client";

import SectionTag from "@/components/ui/SectionTag";
import RemolquesSlider from "@/components/remolques-components/RemolqueSlider";
import RemolqueIntro from "@/components/remolques-components/RemolqueIntro";
import { Caravan, Wrench, Bolt } from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <div className="space-y-12 py-12">
        <div className="pt-8" />
        {/* Componente para mostrar el remolque 3D */}
        <RemolqueIntro />

        <section className="mt-0 flex flex-col items-center gap-10">
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
      <Footer />
    </main>
  );
}
