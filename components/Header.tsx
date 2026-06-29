import Link from 'next/link'
import { getObjectTypes } from '@/lib/cosmic'

export default async function Header() {
  const types = await getObjectTypes()

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-brand-600 transition-colors"
          >
            OlziiNaran&apos;s Project
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {types.length === 0 && (
              <span className="text-sm text-gray-400">No content types</span>
            )}
            {types.map((type) => (
              <Link
                key={type.slug}
                href={`/content/${type.slug}`}
                className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
              >
                {type.emoji ? `${type.emoji} ` : ''}
                {type.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}