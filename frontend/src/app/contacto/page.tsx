"use client"

import { useState, ChangeEvent, FormEvent } from "react"
import { Send, CheckCircle } from 'lucide-react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  asunto: string
  mensaje: string
}

interface FormErrors {
  nombre?: string
  email?: string
  telefono?: string
  asunto?: string
  mensaje?: string
}

export default function ContactoPage() {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio"
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es obligatorio"

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
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
        })

        // Reset después de 5 segundos
        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      }, 1500)
    }
  }

  return (
    <div className="pt-38 pb-16 px-4 md:px-8 max-w-6xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Contacto</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Estamos para ayudarte</h2>
          <p className="text-lg text-gray-700 mb-6">
            Si tienes alguna pregunta sobre nuestros remolques, necesitas asesoramiento personalizado o quieres
            solicitar un presupuesto, no dudes en contactarnos. Nuestro equipo estará encantado de atenderte.
          </p>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-xl font-semibold mb-3">Información de contacto</h3>
            <p className="text-gray-700 mb-2">
              <strong>Dirección:</strong> Avenida Juan Ramón Jiménez, 115, 30420 Calasparra, Murcia
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Teléfono:</strong> 968 720 049
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong> info@donate.com
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Horario:</strong> Lunes a Viernes: 9:00 - 14:00 y 16:00 - 19:00
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Servicio de atención al cliente</h3>
            <p className="text-gray-700 mb-4">
              Para consultas sobre productos ya adquiridos, servicio técnico o reclamaciones:
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Teléfono:</strong> 968 720 049
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> atencion@donate.com
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
              <h3 className="text-2xl font-semibold text-center mb-2">¡Mensaje enviado!</h3>
              <p className="text-gray-700 text-center">Gracias por contactarnos. Te responderemos lo antes posible.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.nombre ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div className="mb-4">
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

                <div className="mb-4">
                  <label htmlFor="telefono" className="block text-gray-700 font-medium mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="asunto" className="block text-gray-700 font-medium mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                      errors.mensaje ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                    }`}
                  />
                  {errors.mensaje && <p className="text-red-500 text-sm mt-1">{errors.mensaje}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
