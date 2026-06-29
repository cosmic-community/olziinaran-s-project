// app/content/[type]/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  getObject,
  getObjectType,
  findFirstImage,
  getMetafieldValue,
} from '@/lib/cosmic'
import { isCosmicImage } from '@/types'

export const revalidate = 60

export default async function ObjectDetailPage({
  params,
}: {
  params: Promise<{ type: string; slug: string }>
}) {
  const { type, slug } = await params

  const objectType = await getObjectType(type)
  const object = await getObject(type, slug)

  if (!object) {
    notFound()
  }

  const heroImage = findFirstImage(object)
  const metadata = object.metadata || {}

  // Build a list of renderable metadata fields (excluding the hero image)
  const fields: Array<{ key: string; label: string; value: string }> = []
  for (const key of Object.keys(metadata)) {
    const raw = metadata[key]

    // Skip image fields (rendered separately)
    if (isCosmicImage(raw)) {
      continue
    }
    // Skip nested objects / arrays for simplicity
    if (typeof raw === 'object' && raw !== null) {
      continue
    }

    const value = getMetafieldValue(raw)
    if (!value) continue

    const label = key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())

    fields.push({ key, label, value })
  }

  // Long-form content field, if present
  const longContent =
    getMetafieldValue(metadata['content']) ||
    getMetafieldValue(metadata['body']) ||
    object.content ||
    ''

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-brand-600 hover:text-brand-700">
          Home
        </Link>
        <span className="text-gray-400 mx-2">/</span>
        <Link
          href={`/content/${type}`}
          className="text-brand-600 hover:text-brand-700"
        >
          {objectType?.title || type}
        </Link>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-gray-600">{object.title}</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        {object.title}
      </h1>

      {heroImage && (
        <div className="mb-8 rounded-xl overflow-hidden bg-gray-100">
          <img
            src={`${heroImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={object.title}
            width={800}
            height={450}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {fields.length > 0 && (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
          {fields.map((field) => (
            <div
              key={field.key}
              className="flex flex-col sm:flex-row sm:items-start px-5 py-4 gap-1 sm:gap-4"
            >
              <span className="text-sm font-medium text-gray-500 sm:w-40 flex-shrink-0">
                {field.label}
              </span>
              <span className="text-sm text-gray-900 break-words">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {longContent && (
        <div
          className="prose prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: longContent }}
        />
      )}
    </article>
  )
}