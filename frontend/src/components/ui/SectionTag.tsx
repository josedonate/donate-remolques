import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface SectionTagProps {
  title: string
  description: string
  href: string
  Icon: LucideIcon
}

export default function SectionTag({ title, description, href, Icon }: SectionTagProps) {
  return (
    <Link
      href={href}
      className="w-full max-w-5xl border rounded-2xl p-6 flex items-center justify-between hover:shadow-lg transition group bg-white"
    >
      <div className="flex items-center gap-6">
        <Icon className="w-14 h-14 text-gray-700 group-hover:text-black transition" />
        <div>
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-base text-gray-600">{description}</p>
        </div>
      </div>
      <ArrowRight className="w-7 h-7 text-gray-400 group-hover:translate-x-1 transition" />
    </Link>
  )
}
