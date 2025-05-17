"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Send, CheckCircle, Info } from "lucide-react"

interface FormData {
  nombreEmpresa: string
  cif: string
  direccion: string
  poblacion: string
  provincia: string
  codigoPostal: string
  nombreContacto: string
  telefono: string
  email: string
  experiencia: string
  zona: string
  motivacion: string
}

interface FormErrors {
  nombreEmpresa?: string
  cif?: string
  direccion?: string
  poblacion?: string
  provincia?: string
  codigoPostal?: string
  nombreContacto?: string
  telefono?: string
  email?: string
  experiencia?: string
  zona?: string
  motivacion?: string
}

export default function DistribuidorPage() {
  const [formData, setFormData] = useState<FormData>({
    nombreEmpresa: "",
    cif: "",
    direccion: "",
    poblacion: "",
    provincia: "",
    codigoPostal: "",
    nombreContacto: "",
    telefono: "",
    email: "",
    experiencia: "",
    zona: "",
    motivacion: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.nombreEmpresa.trim()) newErrors.nombreEmpresa = "El nombre de la empresa es obligatorio"
    if (!formData.cif.trim()) newErrors.cif = "El CIF es obligatorio"
    if (!formData.direccion.trim()) newErrors.direccion = "La dirección es obligatoria"
    if (!formData.nombreContacto.trim()) newErrors.nombreContacto = "El nombre de contacto es obligatorio"
    if (!formData.telefono.trim()) newErrors.telefono = "El teléfono es obligatorio"

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.zona.trim()) newErrors.zona = "La zona de distribución es obligatoria"
    if (!formData.motivacion.trim()) newErrors.motivacion = "Este campo es obligatorio"

    return newErrors
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newErrors = validate()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)

      // Simulación de envío
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)

        // Reset después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            nombreEmpresa: "",
            cif: "",
            direccion: "",
            poblacion: "",
            provincia: "",
            codigoPostal: "",
            nombreContacto: "",
            telefono: "",
            email: "",
            experiencia: "",
            zona: "",
            motivacion: "",
          })
        }, 5000)
      }, 1500)
    }
  }

  return (
    <div className="pt-38 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Conviértete en Distribuidor</h1>

      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Únete a nuestra red de distribuidores</h2>
        <p className="text-lg text-gray-700 mb-6">
          En Remolques Donate buscamos ampliar nuestra red de distribuidores con empresas comprometidas con la calidad y
          el servicio al cliente. Si estás interesado en distribuir nuestros productos en tu zona, completa el siguiente
          formulario y nos pondremos en contacto contigo.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Evaluamos todas las solicitudes cuidadosamente. Nuestro equipo comercial se pondrá en contacto contigo
                para discutir los detalles y posibilidades de colaboración.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-12">
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="text-green-500 w-20 h-20 mb-6" />
            <h3 className="text-2xl font-semibold text-center mb-3">¡Solicitud enviada con éxito!</h3>
            <p className="text-gray-700 text-center max-w-md">
              Gracias por tu interés en convertirte en distribuidor de Remolques Donate. Hemos recibido tu solicitud y
              nos pondremos en contacto contigo en los próximos días.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Datos de la empresa</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombreEmpresa" className="block text-gray-700 font-medium mb-2">
                    Nombre de la empresa *
                  </label>
                  <input
                    type="text"
                    id="nombreEmpresa"
                    name="nombreEmpresa"
                    value={formData.nombreEmpresa}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.nombreEmpresa ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.nombreEmpresa && <p className="text-red-500 text-sm mt-1">{errors.nombreEmpresa}</p>}
                </div>

                <div>
                  <label htmlFor="cif" className="block text-gray-700 font-medium mb-2">
                    CIF/NIF *
                  </label>
                  <input
                    type="text"
                    id="cif"
                    name="cif"
                    value={formData.cif}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.cif ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.cif && <p className="text-red-500 text-sm mt-1">{errors.cif}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="direccion" className="block text-gray-700 font-medium mb-2">
                    Dirección *
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.direccion ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
                </div>

                <div>
                  <label htmlFor="poblacion" className="block text-gray-700 font-medium mb-2">
                    Población
                  </label>
                  <input
                    type="text"
                    id="poblacion"
                    name="poblacion"
                    value={formData.poblacion}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label htmlFor="provincia" className="block text-gray-700 font-medium mb-2">
                    Provincia
                  </label>
                  <input
                    type="text"
                    id="provincia"
                    name="provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label htmlFor="codigoPostal" className="block text-gray-700 font-medium mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    id="codigoPostal"
                    name="codigoPostal"
                    value={formData.codigoPostal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Datos de contacto</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombreContacto" className="block text-gray-700 font-medium mb-2">
                    Nombre de contacto *
                  </label>
                  <input
                    type="text"
                    id="nombreContacto"
                    name="nombreContacto"
                    value={formData.nombreContacto}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.nombreContacto
                        ? "border-red-500 focus:ring-red-200"
                        : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.nombreContacto && <p className="text-red-500 text-sm mt-1">{errors.nombreContacto}</p>}
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.telefono ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.email ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b">Información adicional</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="experiencia" className="block text-gray-700 font-medium mb-2">
                    Experiencia en el sector
                  </label>
                  <select
                    id="experiencia"
                    name="experiencia"
                    value={formData.experiencia}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Seleccionar</option>
                    <option value="menos1">Menos de 1 año</option>
                    <option value="1a3">1-3 años</option>
                    <option value="3a5">3-5 años</option>
                    <option value="5a10">5-10 años</option>
                    <option value="mas10">Más de 10 años</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="zona" className="block text-gray-700 font-medium mb-2">
                    Zona de distribución deseada *
                  </label>
                  <input
                    type="text"
                    id="zona"
                    name="zona"
                    value={formData.zona}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.zona ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                    placeholder="Ej: Murcia y Alicante"
                  />
                  {errors.zona && <p className="text-red-500 text-sm mt-1">{errors.zona}</p>}
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="motivacion" className="block text-gray-700 font-medium mb-2">
                    ¿Por qué quieres distribuir nuestros productos? *
                  </label>
                  <textarea
                    id="motivacion"
                    name="motivacion"
                    value={formData.motivacion}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.motivacion ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.motivacion && <p className="text-red-500 text-sm mt-1">{errors.motivacion}</p>}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition duration-300 flex items-center justify-center min-w-[200px]"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Enviar solicitud
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
