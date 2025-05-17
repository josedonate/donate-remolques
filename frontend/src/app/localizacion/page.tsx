"use client";

import { useState, useEffect } from "react";

export default function LocalizacionPage() {
  const [mapLoaded, setMapLoaded] = useState(false);
  
  useEffect(() => {
    // Simular carga del mapa
    const timer = setTimeout(() => {
      setMapLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-38 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Nuestra Ubicación</h1>
      
      <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Visítanos en Calasparra</h2>
          <p className="text-lg text-gray-700 mb-6">
            Estamos ubicados en un punto estratégico de Calasparra, con fácil acceso y amplias 
            instalaciones para atenderte mejor.
          </p>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3">Dirección</h3>
            <p className="text-gray-700 mb-1">Avenida Juan Ramón Jiménez, 115</p>
            <p className="text-gray-700 mb-1">30420 Calasparra</p>
            <p className="text-gray-700 mb-1">Murcia, España</p>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3">Horario</h3>
            <div className="grid grid-cols-2 gap-2">
              <p className="text-gray-700">Lunes - Viernes:</p>
              <p className="text-gray-700">9:00 - 14:00 y 16:00 - 19:00</p>
              <p className="text-gray-700">Sábados:</p>
              <p className="text-gray-700">9:00 - 14:00</p>
              <p className="text-gray-700">Domingos:</p>
              <p className="text-gray-700">Cerrado</p>
            </div>
          </div>
          
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Contacto</h3>
            <p className="text-gray-700 mb-1">Teléfono: 968 720 049</p>
            <p className="text-gray-700 mb-1">Email: info@donate.com</p>
          </div>
        </div>
        
        <div className="h-[500px] rounded-lg overflow-hidden shadow-lg">
          {mapLoaded ? (
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3138.5677963043344!2d-1.7068858!3d38.2299872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63fe3f5c5c5c5c%3A0x5c5c5c5c5c5c5c5c!2sAvenida%20Juan%20Ram%C3%B3n%20Jim%C3%A9nez%2C%20115%2C%2030420%20Calasparra%2C%20Murcia!5e0!3m2!1ses!2ses!4v1621234567890!5m2!1ses!2ses" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de Remolques Donate"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500"></div>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Cómo llegar</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Desde Murcia</h3>
            <p className="text-gray-700">
              Toma la autovía A-30 dirección Madrid. Continúa por la N-301 hasta llegar a Calasparra. 
              En la entrada del pueblo, sigue las indicaciones hacia Avenida Juan Ramón Jiménez.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Desde Albacete</h3>
            <p className="text-gray-700">
              Toma la A-30 dirección Murcia. Desvíate en la salida hacia Calasparra y sigue las 
              indicaciones hasta el centro del pueblo. Nuestra ubicación está señalizada.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3 text-center">Transporte público</h3>
            <p className="text-gray-700">
              Existen líneas regulares de autobús desde Murcia y otras localidades cercanas. 
              La parada más cercana está a 5 minutos a pie de nuestras instalaciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
