// app/content/[type]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getObjectType, getObjectsByType } from '@/lib/cosmic'
import ContentCard from '@/components/ContentCard'

export const revalidate = 60

export default async function ContentTypePage({
  params,
}: {
  params: Promise<{ type: string }>
}) {
  const { type } = await params

  const objectType = await getObjectType(type)

  if (!objectType) {
    notFound()
  }

  const objects = await getObjectsByType(type)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-brand-600 hover:text-brand-700">
          Home
        </Link>
        <span className="text-gray-400 mx-2">/</span>
        <span className="text-gray-600">{objectType.title}</span>
      </nav>

      <div className="flex items-center gap-3 mb-8">
        {objectType.emoji && (
          <span className="text-3xl">{objectType.emoji}</span>
        )}
        <h1 className="text-3xl font-bold text-gray-900">
          {objectType.title}
        </h1>
      </div>

      {objects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">
            No {objectType.title.toLowerCase()} found yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objects.map((object) => (
            <ContentCard key={object.id} object={object} typeSlug={type} />
          ))}
        </div>
      )}
    </div>
  )
}