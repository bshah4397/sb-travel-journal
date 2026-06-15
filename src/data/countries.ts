import type { Continent } from '@/theme/tokens';

/** Who logged the country. */
export type Traveller = 'duo' | 'bhavya' | 'shraddha';

export interface CountryPhotos {
  /** Shared souvenir shot (shown on the Together view + modal hero). */
  shared?: string;
  /** Bhavya's personal shot. */
  bhavya?: string;
  /** Shraddha's personal shot. */
  shraddha?: string;
}

export interface Country {
  id: string;
  name: string;
  /** Flag emoji (an SVG flag could be swapped in later). */
  flag: string;
  continent: Continent;
  /** ISO date the country was visited. */
  dateVisited: string;
  /** Who was there. `duo` = both together. */
  who: Traveller;
  /** Flagged "remote / difficult", worth bonus XP. */
  remote: boolean;
  /** Short journal note shown in the detail modal. */
  notes: string;
  /** Approx distance from home, km, used for "furthest" stat. */
  km: number;
  /** Optional couple milestone celebrated on this country (e.g. first trip). */
  milestone?: string;
  /**
   * Hand-placed map coordinates as percentages (0–100) of the map panel,
   * matching the mockup's stylized map rather than real lat/long.
   */
  map: { x: number; y: number };
  /**
   * Static photo assets, committed to /public. Optional for now, the UI
   * renders styled placeholders until real images are dropped in.
   */
  photos?: CountryPhotos;
}

/**
 * The challenge log. Edit this file and commit to update the site …
 * there is no backend, no auth, no upload UI (read-only display app).
 *
 * Data mirrors the approved mockup. Photo paths follow the convention
 * `/assets/countries/<id>/<shared|bhavya|shraddha>.jpg` once images exist.
 */
export const COUNTRIES: Country[] = [
  {
    id: 'uae',
    name: 'Dubai',
    flag: '🇦🇪',
    continent: 'Asia',
    dateVisited: '2009-07-01',
    who: 'bhavya',
    remote: false,
    notes:
      'Bhavya’s very first stamp, dune drives at dusk and the gold souks of old Dubai.',
    km: 1930,
    map: { x: 62, y: 43 },
    milestone: 'Where it all began',
  },
  {
    id: 'indonesia',
    name: 'Bali',
    flag: '🇮🇩',
    continent: 'Asia',
    dateVisited: '2018-06-01',
    who: 'shraddha',
    remote: false,
    notes:
      'Shraddha’s island escape, rice terraces, temple mornings, and sunsets over Uluwatu.',
    km: 5500,
    map: { x: 80, y: 60 },
  },
  {
    id: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    continent: 'Asia',
    dateVisited: '2017-06-14',
    who: 'bhavya',
    remote: false,
    notes:
      'Bhavya in the Lion City, Gardens by the Bay glowing after dark and hawker-stall feasts.',
    km: 3915,
    map: { x: 77, y: 56 },
  },
  {
    id: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    continent: 'Oceania',
    dateVisited: '2019-06-18',
    who: 'bhavya',
    remote: true,
    notes:
      'Bhavya down under, the Opera House sails and a ferry ride across Sydney Harbour.',
    km: 10160,
    map: { x: 88, y: 80 },
  },
  {
    id: 'india',
    name: 'India',
    flag: '🇮🇳',
    continent: 'Asia',
    dateVisited: '2022-06-26',
    who: 'duo',
    remote: false,
    notes:
      'Our first trip as two, misty hill-station mornings in Mussoorie and chai on the Mall Road.',
    km: 1180,
    map: { x: 66, y: 38 },
    milestone: 'First trip as two',
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    continent: 'Europe',
    dateVisited: '2023-08-01',
    who: 'shraddha',
    remote: false,
    notes:
      'Shraddha through Barcelona, Granada and Valencia, Gaudí curves, the Alhambra, and paella by the sea.',
    km: 7000,
    map: { x: 46, y: 34 },
  },
  {
    id: 'england',
    name: 'England',
    flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    continent: 'Europe',
    dateVisited: '2023-12-24',
    who: 'duo',
    remote: false,
    notes:
      'Christmas together in London, lights down Regent Street and mulled wine in the cold.',
    km: 7200,
    map: { x: 46, y: 26 },
  },
  {
    id: 'scotland',
    name: 'Scotland',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    continent: 'Europe',
    dateVisited: '2023-12-30',
    who: 'duo',
    remote: false,
    notes:
      'New Year in Edinburgh, the castle on the hill and Hogmanay over the Royal Mile.',
    km: 7700,
    map: { x: 45, y: 22 },
  },
  {
    id: 'usa',
    name: 'United States',
    flag: '🇺🇸',
    continent: 'Americas',
    dateVisited: '2024-03-04',
    who: 'duo',
    remote: false,
    notes:
      'Our furthest yet, red-brick Beacon Hill, the Boston Freedom Trail, and proper New England chowder.',
    km: 12500,
    map: { x: 26, y: 32 },
    milestone: 'Furthest we’ve been',
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    continent: 'Americas',
    dateVisited: '2025-06-15',
    who: 'bhavya',
    remote: false,
    notes:
      'Bhavya in Old Montreal, cobblestones, French cafés, and a summer festival in full swing.',
    km: 12000,
    map: { x: 25, y: 29 },
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    continent: 'Europe',
    dateVisited: '2025-08-22',
    who: 'duo',
    remote: false,
    notes:
      'Rolling Tuscan vineyards and hill towns, long lunches, cypress roads, and far too much Chianti.',
    km: 6300,
    map: { x: 50, y: 33 },
  },
  {
    id: 'vatican',
    name: 'Vatican City',
    flag: '🇻🇦',
    continent: 'Europe',
    dateVisited: '2025-08-31',
    who: 'duo',
    remote: false,
    notes:
      'St Peter’s dome and the Sistine ceiling, the smallest country, the biggest awe.',
    km: 6200,
    map: { x: 51, y: 34 },
  },
  {
    id: 'latvia',
    name: 'Latvia',
    flag: '🇱🇻',
    continent: 'Europe',
    dateVisited: '2026-06-06',
    who: 'shraddha',
    remote: false,
    notes:
      'Shraddha in the Baltic, Art Nouveau facades and Riga’s old town under summer light.',
    km: 6100,
    map: { x: 57, y: 24 },
  },
];

/** The two racers and their "turns 30" deadlines (hardcoded per the brief). */
export const RACERS = {
  bhavya: {
    key: 'bhavya' as const,
    name: 'Bhavya',
    initial: 'B',
    /** 4 March 2027. */
    turns30: '2027-03-04',
  },
  shraddha: {
    key: 'shraddha' as const,
    name: 'Shraddha',
    initial: 'S',
    /** 26 June 2027, 114 days more generous. */
    turns30: '2027-06-26',
  },
};
