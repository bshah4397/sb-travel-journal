/**
 * Design tokens for the "30 Under 30" travel journal.
 *
 * Values are lifted verbatim from the approved HTML mockup
 * (`website-ui-ux-design-export/project/30 Under 30.dc.html`) so the React
 * build stays pixel-faithful. The aesthetic is warm paper / scrapbook, NOT
 * the dark-mode direction in the original creative brief.
 */

export type ViewKey = 'together' | 'bhavya' | 'shraddha';

export type Continent =
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'Americas'
  | 'Oceania'
  | 'Antarctica';

/** Paper, ink and shared surface colors used across every view. */
export const palette = {
  /** Page background (outermost kraft paper). */
  pageBg: '#E7DBC1',
  /** Journal "sheet" surface. */
  sheet: '#F6EFDF',
  /** Raised card / tag surfaces. */
  cardCream: '#FBF7EC',
  cardCreamAlt: '#FBF8F1',
  /** Aged map panel. */
  mapBg: '#ECE1C4',
  luggageTag: '#E4D2AE',
  progressTrack: '#EAE0C8',
  /** Primary ink (text). */
  ink: '#463524',
  /** Stamp red, used for urgency / "visited" stamps / final stretch. */
  stampRed: '#B0503C',
  /** Map ink (dashed route lines). */
  mapInk: '#9A5A3E',
} as const;

/** Per-view accent system. `mid` = accent fill, `ink` = accent text. */
export const viewThemes: Record<
  ViewKey,
  { mid: string; ink: string; pastel: string; soft: string }
> = {
  together: { mid: '#A7B79A', ink: '#5C6B49', pastel: '#E4E8D5', soft: '#EDEFE0' },
  bhavya: { mid: '#92AEC6', ink: '#3F5C75', pastel: '#DBE6EF', soft: '#E7EFF6' },
  shraddha: { mid: '#BBA0C6', ink: '#6E4F7A', pastel: '#EADFF0', soft: '#F1E9F5' },
};

/** Dot / accent color per continent. */
export const continentColors: Record<Continent, string> = {
  Europe: '#8E9F7E',
  Asia: '#CDA267',
  Africa: '#D9B25A',
  Americas: '#88A8C4',
  Oceania: '#B79BC4',
  Antarctica: '#9FB0BE',
};

/** Washi-tape palette, cycled across cards. */
export const washiTape = [
  '#A7B79A',
  '#D9B26A',
  '#C49BB0',
  '#92AEC6',
  '#C77B5A',
  '#7FA9A3',
  '#CDA267',
  '#B79BC4',
] as const;

export const fonts = {
  /** Bold uppercase display, big titles & headers (MEMORIES/ROAD-TRIP style). */
  display: "'Oswald', sans-serif",
  /** Signature script, personal accents (names, tagline, diary). */
  script: "'Sacramento', cursive",
  /** Typewriter labels / meta. */
  mono: "'Special Elite', monospace",
  /** Body / numerals. */
  body: "'Lato', system-ui, sans-serif",
} as const;

/** Total countries in the challenge. */
export const TARGET_COUNT = 30;
export const TOTAL_CONTINENTS = 6;
