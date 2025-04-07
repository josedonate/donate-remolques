'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, BookOpen, MapPin } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Remolques', href: '/remolques' },
  { label: 'Configurador', href: '/configurador' },
  { label: 'Repuestos', href: '/repuestos' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto max-w px-6 py-9 flex items-center justify-between">
        {/* Logo Donate */}
        <Link
          href="/"
          className="text-5xl font-logo tracking-wide text-black"
        >
          Donate
        </Link>

        {/* Enlaces fijos solo en escritorio (alineados a la derecha) */}
        <nav className="hidden md:flex gap-8 text-2xl font-medium text-gray-700 ml-auto">
          <Link
            href="/historia"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <BookOpen size={25} />
            Historia
          </Link>
          <Link
            href="/localizacion"
            className="flex items-center gap-2 hover:text-black transition"
          >
            <MapPin size={25} />
            Localización
          </Link>
        </nav>

        {/* Menú hamburguesa (solo visible en móvil) */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Menú desplegable solo en móvil */}
      <div
        className={clsx(
          'md:hidden absolute top-full left-0 w-full bg-white shadow transition-all duration-300',
          menuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-4 text-base font-medium">
          <Link
            href="/historia"
            className="flex items-center gap-2 hover:text-black transition"
            onClick={() => setMenuOpen(false)}
          >
            <BookOpen size={18} />
            Historia
          </Link>
          <Link
            href="/localizacion"
            className="flex items-center gap-2 hover:text-black transition"
            onClick={() => setMenuOpen(false)}
          >
            <MapPin size={18} />
            Localización
          </Link>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </nav>
  )
}
