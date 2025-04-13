// src/components/Footer.tsx
export default function Footer() {
    return (
      <footer className="bg-gray-100 text-gray-600 text-sm mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-col sm:flex-row">
          <p className="font-logo text-lg text-gray-800">Donate</p>
          <p>&copy; {new Date().getFullYear()} Donate. Todos los derechos reservados.</p>
        </div>
      </footer>
    )
  }
  