import Image from "next/image";

export default function HistoriaPage() {
  return (
    <div className="pt-38 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Nuestra Historia</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Tradición desde 1961</h2>
          <p className="text-lg text-gray-700 mb-4">
            Desde nuestra fundación en 1961 en Calasparra, Murcia, nos hemos dedicado a la fabricación 
            de remolques de la más alta calidad. Lo que comenzó como un pequeño taller familiar, se ha 
            convertido en una empresa líder en el sector de remolques en toda la región.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Durante más de seis décadas, hemos mantenido vivo el espíritu artesanal combinándolo con 
            las más modernas tecnologías para ofrecer productos que destacan por su durabilidad, 
            funcionalidad y diseño.
          </p>
        </div>
        <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="/placeholder.svg?height=400&width=600" 
            alt="Taller histórico de remolques Donate" 
            fill 
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="order-2 md:order-1 relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
          <Image 
            src="/placeholder.svg?height=400&width=600" 
            alt="Evolución de remolques Donate" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Evolución constante</h2>
          <p className="text-lg text-gray-700 mb-4">
            A lo largo de nuestra historia, hemos evolucionado constantemente para adaptarnos a las 
            necesidades cambiantes del mercado. Desde los primeros remolques agrícolas hasta nuestra 
            actual gama diversificada, cada producto refleja nuestro compromiso con la excelencia.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nuestra experiencia acumulada nos ha permitido perfeccionar cada detalle, creando 
            remolques que son referentes en el sector por su robustez y fiabilidad.
          </p>
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg shadow-inner mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-center">Valores que nos definen</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Calidad</h3>
            <p className="text-gray-700">
              Utilizamos los mejores materiales y procesos de fabricación para garantizar productos 
              duraderos y fiables.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Innovación</h3>
            <p className="text-gray-700">
              Incorporamos constantemente nuevas tecnologías y diseños para mejorar nuestros remolques.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Servicio</h3>
            <p className="text-gray-700">
              Ofrecemos un trato personalizado y asesoramiento experto para satisfacer las necesidades 
              específicas de cada cliente.
            </p>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Mirando al futuro</h2>
        <p className="text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          Hoy, con más de 60 años de experiencia, seguimos comprometidos con la misma pasión y 
          dedicación que nos ha caracterizado desde nuestros inicios. Continuamos innovando y 
          expandiendo nuestra presencia, manteniendo siempre la esencia que nos ha convertido en 
          un referente en el sector de remolques en Calasparra y toda España.
        </p>
      </div>
    </div>
  );
}
