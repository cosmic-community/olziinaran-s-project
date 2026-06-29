// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
  thumbnail?: string;
}

// Cosmic Object Type (content model definition)
export interface CosmicObjectType {
  slug: string;
  title: string;
  singular?: string;
  metafields?: unknown[];
  emoji?: string;
}

// Generic API response types
export interface CosmicFindResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

export interface CosmicFindOneResponse<T> {
  object: T;
}

export interface CosmicObjectTypesResponse {
  object_types: CosmicObjectType[];
}

// File/Image metafield shape
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Type guard for image objects
export function isCosmicImage(value: unknown): value is CosmicImage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'imgix_url' in value &&
    typeof (value as { imgix_url: unknown }).imgix_url === 'string'
  );
}