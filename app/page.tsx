import Link from 'next/link'
import { getObjectTypes } from '@/lib/cosmic'

export const revalidate = 60

export default async function HomePage() {
  const types = await getObjectTypes()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-brand-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
            OlziiNaran&apos;s Project
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-brand-100">
            A modern, responsive website powered by Cosmic. Explore the content
            below.
          </p>
        </div>
      </section>

      {/* Content types grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Browse Content
        </h2>

        {types.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">
              No content types found in your Cosmic bucket yet.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Add content types in your Cosmic dashboard and they will appear
              here automatically.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((type) => (
              <Link
                key={type.slug}
                href={`/content/${type.slug}`}
                className="group flex items-center gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md hover:border-brand-300 transition-all"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-brand-50 flex items-center justify-center text-2xl">
                  {type.emoji || '📄'}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-sm text-gray-500">View all</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}