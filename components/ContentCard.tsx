import Link from 'next/link'
import type { CosmicObject } from '@/types'
import { findFirstImage, getMetafieldValue } from '@/lib/cosmic'

interface ContentCardProps {
  object: CosmicObject
  typeSlug: string
}

export default function ContentCard({ object, typeSlug }: ContentCardProps) {
  if (!object || !object.slug) {
    return null
  }

  const image = findFirstImage(object)

  // Try to find a short description-like field
  const metadata = object.metadata || {}
  let description = ''
  for (const key of ['description', 'summary', 'excerpt', 'bio', 'content']) {
    if (key in metadata) {
      const candidate = getMetafieldValue(metadata[key])
      if (candidate) {
        description = candidate
        break
      }
    }
  }

  return (
    <Link
      href={`/content/${typeSlug}/${object.slug}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-brand-300 transition-all duration-200"
    >
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-gray-100">
          <img
            src={`${image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={object.title}
            width={400}
            height={225}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {object.title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-3">
            {description.replace(/<[^>]*>/g, '').slice(0, 160)}
          </p>
        )}
      </div>
    </Link>
  )
}