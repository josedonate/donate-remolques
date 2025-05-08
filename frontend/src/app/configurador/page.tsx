"use client";

import ConfiguratorForm from "@/components/configurador/ConfiguratorForm";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export default function ConfiguradorPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-38"/>
      <h1 className="text-3xl font-bold text-center mb-8">Configurador de Remolques</h1>
      <ConfiguratorForm />
      <Footer />
    </main>
  );
}
