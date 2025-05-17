import { getRemolqueById } from "@/services/remolqueService";
import RemolqueFeatures from "@/components/remolques-components/RemolqueFeatures";
import Remolque3DViewer from "@/components/remolques-components/Remolque3DViewer";
import { RemolqueDTO } from "@/types/remolque";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export default async function RemolquePage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) return notFound();

    const remolque: RemolqueDTO = await getRemolqueById(id);
    if (!remolque) return notFound();

    return (
        <div className="md:px-10 px-0 py-18 max-w-screen-xl mx-auto">
          {/* Título */}
          {/* Botón para volver al catálogo */}
          <div className="pt-15" />
          <Link
            href="/remolques"
            className="text-sm hover:underline mb-4 inline-block"
          >
            ← Volver al catálogo
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Remolque{" "}
            <span className="text-cyan-600">{remolque.referencia}</span>
          </h1>

          <div className="flex flex-col lg:flex-row">
            <RemolqueFeatures remolque={remolque} />
            <div className="flex-1">
              <Remolque3DViewer url={remolque.urlModelo3D} />
            </div>
          </div>

          {remolque.descripcion && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Descripción:</h2>
              <p className="text-gray-700 whitespace-pre-line">
                {remolque.descripcion}
              </p>
            </div>
          )}
        </div>
    );
  } catch {
    return notFound();
  }
}
