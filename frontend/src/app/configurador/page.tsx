import ConfiguratorForm from '@/components/configurador/ConfiguratorForm';

export default function ConfiguradorPage() {
  return (
    <main className="min-h-screen bg-white px-4 md:px-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center py-6">Configurador de Remolques</h1>
      <ConfiguratorForm />
    </main>
  );
}
