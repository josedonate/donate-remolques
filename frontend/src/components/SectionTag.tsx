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
      className="w-full max-w-xl border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition group"
    >
      <div className="flex items-center gap-4">
        <Icon className="w-10 h-10 text-gray-700 group-hover:text-black transition" />
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <ArrowRight className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition" />
    </Link>
  )
}
