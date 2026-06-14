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
  /** Flagged "remote / difficult" — worth bonus XP. */
  remote: boolean;
  /** Short journal note shown in the detail modal. */
  notes: string;
  /** Approx distance from home, km — used for "furthest" stat. */
  km: number;
  /**
   * Hand-placed map coordinates as percentages (0–100) of the map panel,
   * matching the mockup's stylized map rather than real lat/long.
   */
  map: { x: number; y: number };
  /**
   * Static photo assets, committed to /public. Optional for now — the UI
   * renders styled placeholders until real images are dropped in.
   */
  photos?: CountryPhotos;
}

/**
 * The challenge log. Edit this file and commit to update the site —
 * there is no backend, no auth, no upload UI (read-only display app).
 *
 * Data mirrors the approved mockup. Photo paths follow the convention
 * `/assets/countries/<id>/<shared|bhavya|shraddha>.jpg` once images exist.
 */
export const COUNTRIES: Country[] = [
  {
    id: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    continent: 'Asia',
    dateVisited: '2024-09-14',
    who: 'duo',
    remote: false,
    notes:
      'Longtail boats off Railay Beach — the first big trip of the challenge, and the one that started all this.',
    km: 9180,
    map: { x: 76, y: 52 },
  },
  {
    id: 'greece',
    name: 'Greece',
    flag: '🇬🇷',
    continent: 'Europe',
    dateVisited: '2024-11-02',
    who: 'duo',
    remote: false,
    notes:
      'Santorini at blue hour, the whole caldera glowing pink and gold while we ate olives on a rooftop.',
    km: 2400,
    map: { x: 57, y: 37 },
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    continent: 'Europe',
    dateVisited: '2025-01-19',
    who: 'duo',
    remote: false,
    notes:
      'Driving the Amalfi coast at golden hour with the windows down and far too much gelato.',
    km: 1430,
    map: { x: 51, y: 32 },
  },
  {
    id: 'iceland',
    name: 'Iceland',
    flag: '🇮🇸',
    continent: 'Europe',
    dateVisited: '2025-03-08',
    who: 'duo',
    remote: true,
    notes:
      'Chasing the aurora on a black-sand beach near Vík. Minus four degrees and worth every shiver.',
    km: 1880,
    map: { x: 45, y: 16 },
  },
  {
    id: 'mexico',
    name: 'Mexico',
    flag: '🇲🇽',
    continent: 'Americas',
    dateVisited: '2025-05-21',
    who: 'duo',
    remote: false,
    notes: 'Tulum at sunrise — fresh juice, warm stone ruins, and not another soul around.',
    km: 8920,
    map: { x: 19, y: 46 },
  },
  {
    id: 'peru',
    name: 'Peru',
    flag: '🇵🇪',
    continent: 'Americas',
    dateVisited: '2025-07-30',
    who: 'bhavya',
    remote: true,
    notes:
      'Bhavya’s solo trek — sunrise breaking over Machu Picchu after four days on the Inca Trail.',
    km: 8800,
    map: { x: 27, y: 66 },
  },
  {
    id: 'morocco',
    name: 'Morocco',
    flag: '🇲🇦',
    continent: 'Africa',
    dateVisited: '2025-09-25',
    who: 'duo',
    remote: false,
    notes:
      'Gloriously, happily lost in the Marrakech medina until the call to prayer found us again.',
    km: 2300,
    map: { x: 47, y: 44 },
  },
  {
    id: 'newzealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    continent: 'Oceania',
    dateVisited: '2025-12-12',
    who: 'duo',
    remote: true,
    notes:
      'The furthest we’ve ever been from home — 9,500 km and a whole fjord all to ourselves.',
    km: 9500,
    map: { x: 93, y: 84 },
  },
  {
    id: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    continent: 'Asia',
    dateVisited: '2026-03-18',
    who: 'duo',
    remote: false,
    notes:
      'Cherry-blossom season in Kyoto — we caught full bloom along the Philosopher’s Path.',
    km: 9200,
    map: { x: 82, y: 34 },
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    continent: 'Europe',
    dateVisited: '2026-05-22',
    who: 'shraddha',
    remote: false,
    notes:
      'Shraddha’s solo week — Tram 28 rattling up through the Alfama at dusk, pastel de nata in hand.',
    km: 1600,
    map: { x: 43, y: 38 },
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
    /** 26 June 2027 — 114 days more generous. */
    turns30: '2027-06-26',
  },
};
