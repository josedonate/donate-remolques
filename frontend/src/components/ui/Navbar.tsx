"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, BookOpen, MapPin, User } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const navLinks = [
  { label: "Remolques", href: "/remolques" },
  { label: "Configurador", href: "/configurador" },
  { label: "Repuestos", href: "/repuestos" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="mx-auto max-w px-10 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/donate_logo_web.png"
            alt="Logo Donate"
            width={200}
            height={48}
            priority
          />
        </Link>

        {/* Enlaces escritorio */}
        <div className="hidden md:flex items-center gap-8 text-2xl font-medium text-gray-700 ml-auto">
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
          {/* Icono de cuenta */}
          {/* Menú de sesión en escritorio */}
          <div className="relative hidden md:block ml-4">
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="p-2"
              aria-label="Abrir menú de usuario"
            >
              <Menu size={28} />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg overflow-hidden min-w-[180px] z-50">
                <div className="bg-gray-100 px-4 py-2">
                  <Link
                    href="/remolques"
                    className="block py-1 hover:underline"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Remolques
                  </Link>
                  <Link
                    href="/configurador"
                    className="block py-1 hover:underline"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Configurador
                  </Link>
                </div>
                <div className="bg-blue-100 px-4 py-2">
                  {user ? (
                    <>
                      <Link
                        href="/mi-cuenta"
                        className="block py-1 hover:underline"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Mi cuenta
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setUserMenuOpen(false);
                        }}
                        className="block text-left w-full py-1 text-red-600 hover:underline"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  ) : (
                    <Link
                      href="/login"
                      className="block py-1 hover:underline"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Iniciar sesión
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Menú hamburguesa móvil y también visible en escritorio */}
        <button
          className="md:hidden z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      {/* Menú desplegable móvil (y escritorio si está abierto) */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full bg-white shadow transition-all duration-300 md:hidden",
          menuOpen
            ? "max-h-96 py-4 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
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
          <div className="bg-gray-100 w-full py-2 text-center">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="block py-1 hover:text-black transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="bg-blue-100 w-full py-2 text-center">
            {user ? (
              <>
                <Link
                  href="/mi-cuenta"
                  className="block py-1 hover:text-black transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Mi cuenta
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-red-600 py-1 hover:text-black transition"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block py-1 hover:text-black transition"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        </nav>
      </div>
    </nav>
  );
}
