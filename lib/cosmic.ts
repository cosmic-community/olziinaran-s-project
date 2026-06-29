import { createBucketClient } from '@cosmicjs/sdk'
import type {
  CosmicObject,
  CosmicObjectType,
  CosmicImage,
} from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Safely render any metafield value as a string
export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') {
    return String(field)
  }
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Fetch all object types in the bucket
export async function getObjectTypes(): Promise<CosmicObjectType[]> {
  try {
    const response = await cosmic.objectTypes.find()
    const types = (response.object_types as CosmicObjectType[]) || []
    return types
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch object types')
  }
}

// Fetch a single object type definition by slug
export async function getObjectType(
  typeSlug: string
): Promise<CosmicObjectType | null> {
  try {
    const types = await getObjectTypes()
    const found = types.find((t) => t.slug === typeSlug)
    return found ?? null
  } catch {
    return null
  }
}

// Fetch all objects for a given type
export async function getObjectsByType(
  typeSlug: string
): Promise<CosmicObject[]> {
  try {
    const response = await cosmic.objects
      .find({ type: typeSlug })
      .props(['id', 'slug', 'title', 'metadata', 'thumbnail', 'type', 'created_at', 'modified_at'])
      .depth(1)
    return (response.objects as CosmicObject[]) || []
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch objects for type ${typeSlug}`)
  }
}

// Fetch a single object by type and slug
export async function getObject(
  typeSlug: string,
  objectSlug: string
): Promise<CosmicObject | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: typeSlug, slug: objectSlug })
      .depth(1)
    return (response.object as CosmicObject) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch object ${objectSlug}`)
  }
}

// Helper to find the first image-like value in an object's metadata
export function findFirstImage(obj: CosmicObject): CosmicImage | null {
  if (obj.thumbnail) {
    return {
      url: obj.thumbnail,
      imgix_url: obj.thumbnail,
    }
  }
  const metadata = obj.metadata || {}
  for (const key of Object.keys(metadata)) {
    const value = metadata[key]
    if (
      typeof value === 'object' &&
      value !== null &&
      'imgix_url' in value &&
      typeof (value as { imgix_url: unknown }).imgix_url === 'string'
    ) {
      return value as CosmicImage
    }
  }
  return null
}