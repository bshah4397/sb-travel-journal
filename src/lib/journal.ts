/**
 * Pure selectors that turn the static country log + a view key into the
 * numbers the UI renders. Mirrors the mockup's `renderVals` logic so the
 * React components can stay presentational. No React, no side effects.
 */
import { COUNTRIES, type Country } from '@/data/countries';
import {
  TARGET_COUNT,
  type Continent,
  type ViewKey,
} from '@/theme/tokens';

/** Countries visible in a given view (everything shared, plus that person's solos). */
export function countriesForView(view: ViewKey): Country[] {
  if (view === 'together') return COUNTRIES;
  return COUNTRIES.filter((c) => c.who === 'duo' || c.who === view);
}

export interface Countdown {
  /** Whole days remaining (clamped at 0). */
  days: number;
  /** Zero-padded hours / minutes / seconds. */
  hrs: string;
  mins: string;
  secs: string;
  /** True when under 30 days — UI shifts to the stamp-red "final stretch" look. */
  urgent: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** Time remaining until `targetIso`, evaluated against `now` (ms epoch). */
export function countdown(targetIso: string, now: number): Countdown {
  const target = new Date(targetIso).getTime();
  let diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  diff -= days * 86_400_000;
  const hrs = Math.floor(diff / 3_600_000);
  diff -= hrs * 3_600_000;
  const mins = Math.floor(diff / 60_000);
  diff -= mins * 60_000;
  const secs = Math.floor(diff / 1000);
  return { days, hrs: pad(hrs), mins: pad(mins), secs: pad(secs), urgent: days < 30 };
}

export interface JournalStats {
  count: number;
  remaining: number;
  /** 0–100. */
  progressPct: number;
  continents: Set<Continent>;
  furthest: Country | undefined;
  /** Most recently visited country. */
  latest: Country | undefined;
}

export function statsForView(view: ViewKey): JournalStats {
  const visible = countriesForView(view);
  const continents = new Set(visible.map((c) => c.continent));
  const furthest = visible.reduce<Country | undefined>(
    (max, c) => (!max || c.km > max.km ? c : max),
    undefined,
  );
  const latest = visible.reduce<Country | undefined>(
    (max, c) =>
      !max || new Date(c.dateVisited) > new Date(max.dateVisited) ? c : max,
    undefined,
  );
  return {
    count: visible.length,
    remaining: TARGET_COUNT - visible.length,
    progressPct: (visible.length / TARGET_COUNT) * 100,
    continents,
    furthest,
    latest,
  };
}

/** XP for a single country: +10 base, +15 if remote/difficult. */
export function countryXp(c: Country): number {
  return 10 + (c.remote ? 15 : 0);
}
