/**
 * Convention-based souvenir photos — no code changes needed to add one.
 *
 * Drop image files here:
 *
 *     src/assets/countries/<id>/shared.jpg      (the couple / main photo)
 *     src/assets/countries/<id>/bhavya.jpg      (Bhavya's own shot)
 *     src/assets/countries/<id>/shraddha.jpg    (Shraddha's own shot)
 *
 * where <id> is the country's `id` in data/countries.ts (e.g. "france").
 * .jpg / .jpeg / .png / .webp all work. Vite bundles whatever is present at
 * build time; anything missing simply falls back to the striped placeholder,
 * so there are never broken images or 404s.
 */
import type { Country } from '@/data/countries';

export type PhotoRole = 'shared' | 'bhavya' | 'shraddha';

// Eagerly resolve every committed photo to its final hashed URL.
const modules = import.meta.glob(
  '/src/assets/countries/*/*.{jpg,jpeg,png,webp}',
  { eager: true, query: '?url', import: 'default' },
) as Record<string, string>;

// Index by "<id>/<role>" for O(1) lookup.
const byKey = new Map<string, string>();
for (const [path, url] of Object.entries(modules)) {
  const match = path.match(/\/countries\/([^/]+)\/(shared|bhavya|shraddha)\.[^.]+$/);
  if (match) byKey.set(`${match[1]}/${match[2]}`, url);
}

/**
 * URL for a country's photo in a given role, or undefined if none is
 * committed. An explicit `photos` path in the data file wins if set.
 */
export function resolvePhoto(c: Country, role: PhotoRole): string | undefined {
  return c.photos?.[role] ?? byKey.get(`${c.id}/${role}`);
}
