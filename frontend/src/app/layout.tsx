import './globals.css'
import { Manrope } from 'next/font/google'
import type { Metadata } from 'next'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-manrope',
})

export const metadata: Metadata = {
  title: 'Donate',
  description: 'Fabricación y venta de remolques',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} `}>
      <body className="font-sans bg-white text-gray-900 min-h-screen">
        <Navbar />
        <main className="pt-20 px-4">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
