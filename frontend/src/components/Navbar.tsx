'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { label: 'Historia', href: '/historia' },
  { label: 'Localización', href: '/localizacion' },
  { label: 'Remolques', href: '/remolques' },
  { label: 'Configurador', href: '/configurador' },
  { label: 'Repuestos', href: '/repuestos' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-logo tracking-wide">
          Donate
        </Link>

        {/* Links visibles solo en escritorio */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/historia" className="hover:text-gray-600 transition">
            Historia
          </Link>
          <Link href="/localizacion" className="hover:text-gray-600 transition">
            Localización
          </Link>
        </nav>

        {/* Botón menú hamburguesa (siempre visible) */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menú desplegable (móvil y escritorio) */}
      <div
        className={clsx(
          'md:hidden absolute top-full left-0 w-full bg-white shadow transition-all duration-300',
          menuOpen ? 'max-h-96 py-4 opacity-100' : 'max-h-0 overflow-hidden opacity-0'
        )}
      >
        <nav className="flex flex-col items-center gap-4 text-base font-medium">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="hover:text-gray-700 transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
