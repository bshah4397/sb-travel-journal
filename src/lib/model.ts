/**
 * The full presentational view-model for a journal view. Pure & time-independent
 * (no `now`) so it can be memoized once per view. Live countdowns are computed
 * separately in the page and threaded into the two time-dependent spots
 * (the "clock" stat tag and the "current pace" trip note).
 *
 * Ported from the approved mockup's `renderVals`.
 */
import {
  COUNTRIES,
  type Country,
  type Traveller,
} from '@/data/countries';
import {
  TARGET_COUNT,
  TOTAL_CONTINENTS,
  continentColors,
  viewThemes,
  washiTape,
  type Continent,
  type ViewKey,
} from '@/theme/tokens';
import { countriesForView, countryXp, statsForView } from './journal';

const pad = (n: number) => String(n).padStart(2, '0');

const fmtMonth = (iso: string) =>
  new Date(iso)
    .toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })
    .toUpperCase();
const fmtStamp = (iso: string) =>
  new Date(iso)
    .toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    .toUpperCase();
export const fmtFull = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export interface TabModel {
  key: ViewKey;
  label: string;
  to: string;
  active: boolean;
}

export interface MapPin {
  left: string;
  top: string;
  flag: string;
  name: string;
  delay: string;
  /** Visited together, gets a love heart on the map. */
  isDuo: boolean;
}

export interface MapLink {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface StatTag {
  label: string;
  value: string | number;
  unit: string;
  rot: string;
  /** Marks the time-dependent "clock" tag so the page can inject live days. */
  live?: 'bhavyaDays';
}

export interface CardModel {
  id: string;
  n: number;
  nn: string;
  flag: string;
  name: string;
  continent: Continent;
  contColor: string;
  month: string;
  stampDate: string;
  year: number;
  who: Traveller;
  whoLabel: string;
  whoBg: string;
  whoFg: string;
  rot: string;
  tapeColor: string;
  tapeRot: string;
  slotId: string;
  photo?: string;
  milestone?: string;
}

export interface GhostModel {
  n: number;
  nn: string;
  rot: string;
  tapeRot: string;
}

export interface ContinentBadgeModel {
  name: Continent;
  emoji: string;
  rot: string;
  countLabel: string;
  unlocked: boolean;
  dash: string;
  nameColor: string;
}

export interface AchievementModel {
  icon: string;
  title: string;
  cond: string;
  rot: string;
  unlocked: boolean;
  bg: string;
  border: string;
  titleColor: string;
}

export interface TripNoteModel {
  icon: string;
  label: string;
  value: string;
  rot: string;
  tape: string;
  /** Marks the pace note so the page can inject live days remaining. */
  live?: 'pace';
}

export interface JournalModel {
  view: ViewKey;
  theme: (typeof viewThemes)[ViewKey];
  tabs: TabModel[];
  count: number;
  remaining: number;
  progressPct: number;
  ringOffset: number;
  heroTitle: string;
  heroSub: string;
  levelLabel: string;
  xpLabel: string;
  avatarInitials: string;
  mapPins: MapPin[];
  mapLinks: MapLink[];
  stats: StatTag[];
  cards: CardModel[];
  ghosts: GhostModel[];
  continentBadges: ContinentBadgeModel[];
  achievements: AchievementModel[];
  achUnlocked: number;
  tripNotes: TripNoteModel[];
}

const TAB_DEFS: { key: ViewKey; label: string; to: string }[] = [
  { key: 'together', label: 'Together', to: '/' },
  { key: 'bhavya', label: 'Bhavya', to: '/bhavya' },
  { key: 'shraddha', label: 'Shraddha', to: '/shraddha' },
];

const WHO_MAP: Record<Traveller, { label: string; bg: string; fg: string }> = {
  duo: { label: 'TOGETHER', bg: '#E4E8D5', fg: '#5C6B49' },
  bhavya: { label: 'BHAVYA SOLO', bg: '#DBE6EF', fg: '#3F5C75' },
  shraddha: { label: 'SHRADDHA SOLO', bg: '#EADFF0', fg: '#6E4F7A' },
};

/** Continents in display order with their postage-stamp emoji. */
const CONTINENT_DEFS: { name: Continent; emoji: string }[] = [
  { name: 'Europe', emoji: '🌍' },
  { name: 'Americas', emoji: '🌎' },
  { name: 'Asia', emoji: '🌏' },
  { name: 'Africa', emoji: '🌍' },
  { name: 'Oceania', emoji: '🌏' },
  { name: 'Antarctica', emoji: '🧊' },
];

const CARD_ROTS = [
  '-2.5deg', '1.8deg', '-1.4deg', '2.2deg', '-2deg',
  '1.5deg', '-1.7deg', '2.4deg', '-1.1deg', '1.6deg',
];
const CONT_ROTS = ['-2deg', '1.5deg', '-1deg', '2deg', '-1.5deg', '1deg'];
const ACH_ROTS = ['-1.5deg', '1.2deg', '-2deg', '1.6deg', '-1deg', '2deg', '-1.3deg', '1.8deg'];
const STAT_ROTS = ['-1.5deg', '1.2deg', '-1deg', '1.6deg'];
const NOTE_TAPES = ['#A7B79A', '#D9B26A', '#C49BB0', '#7FA9A3'];

/**
 * Per-view XP / level labels are kept as fixed copy to match the mockup
 * exactly. (They could later be computed from `countryXp`.)
 */
const XP_LABELS: Record<ViewKey, string> = {
  together: '170 XP · shared',
  bhavya: '160 XP earned',
  shraddha: '145 XP earned',
};

export function buildModel(view: ViewKey): JournalModel {
  const theme = viewThemes[view];
  const visible = countriesForView(view);
  const all = COUNTRIES;
  const { count, remaining, progressPct, continents, furthest } = statsForView(view);

  const tabs: TabModel[] = TAB_DEFS.map((t) => ({ ...t, active: t.key === view }));

  const heroTitle =
    view === 'together'
      ? `${count} stamps, ${remaining} to go.`
      : view === 'bhavya'
        ? `${count} for Bhavya.`
        : `${count} for Shraddha.`;
  const heroSub =
    view === 'together'
      ? 'Two passports, one race against thirty. The earlier birthday sets the clock.'
      : view === 'bhavya'
        ? 'His deadline is the shared race clock, 4 March 2027, the tightest line on the board.'
        : 'Her deadline runs 114 days more generous, 26 June 2027. A little more room to roam.';

  const levelLabel = view === 'shraddha' ? 'LV.5 GLOBETROTTER' : 'LV.6 EXPEDITION';
  const avatarInitials = view === 'together' ? 'SB' : view === 'bhavya' ? 'B' : 'S';

  const mapPins: MapPin[] = visible.map((c, i) => ({
    left: `${c.map.x}%`,
    top: `${c.map.y}%`,
    flag: c.flag,
    name: c.name,
    delay: `${i * 0.4}s`,
    isDuo: c.who === 'duo',
  }));
  const mapLinks: MapLink[] = [];
  for (let i = 0; i < visible.length - 1; i++) {
    const a = visible[i];
    const b = visible[i + 1];
    mapLinks.push({ x1: a.map.x, y1: a.map.y, x2: b.map.x, y2: b.map.y });
  }

  const ringOffset = 440 - 440 * (count / TARGET_COUNT);

  const stats: StatTag[] = [
    { label: 'Continents', value: continents.size, unit: `of ${TOTAL_CONTINENTS}`, rot: STAT_ROTS[0] },
    { label: 'Countries', value: count, unit: `of ${TARGET_COUNT}`, rot: STAT_ROTS[1] },
    { label: 'His clock', value: '…', unit: 'days left', rot: STAT_ROTS[2], live: 'bhavyaDays' },
    { label: 'Furthest', value: furthest?.flag ?? '…', unit: furthest?.name ?? '', rot: STAT_ROTS[3] },
  ];

  const cards: CardModel[] = visible.map((c, i) => {
    let who = WHO_MAP[c.who];
    if (view !== 'together' && c.who === view) {
      who = { label: 'SOLO', bg: theme.pastel, fg: theme.ink };
    }
    return {
      id: c.id,
      n: i + 1,
      nn: pad(i + 1),
      flag: c.flag,
      name: c.name,
      continent: c.continent,
      contColor: continentColors[c.continent],
      month: fmtMonth(c.dateVisited),
      stampDate: fmtStamp(c.dateVisited),
      year: new Date(c.dateVisited).getFullYear(),
      who: c.who,
      whoLabel: who.label,
      whoBg: who.bg,
      whoFg: who.fg,
      rot: CARD_ROTS[i % CARD_ROTS.length],
      tapeColor: washiTape[i % washiTape.length],
      tapeRot: i % 2 ? '4deg' : '-5deg',
      slotId: `slot-${view}-${c.id}`,
      photo: photoFor(c),
      milestone: c.milestone,
    };
  });

  const ghosts: GhostModel[] = [];
  for (let i = count; i < TARGET_COUNT; i++) {
    ghosts.push({
      n: i + 1,
      nn: pad(i + 1),
      rot: CARD_ROTS[i % CARD_ROTS.length],
      tapeRot: i % 2 ? '4deg' : '-5deg',
    });
  }

  const continentBadges: ContinentBadgeModel[] = CONTINENT_DEFS.map((ct, idx) => {
    const n = visible.filter((c) => c.continent === ct.name).length;
    const unlocked = n > 0;
    return {
      name: ct.name,
      emoji: ct.emoji,
      rot: CONT_ROTS[idx],
      countLabel: unlocked ? `${n}${n === 1 ? ' country' : ' countries'}` : 'locked',
      unlocked,
      dash: unlocked ? continentColors[ct.name] : 'rgba(74,58,40,.3)',
      nameColor: unlocked ? '#463524' : 'rgba(70,53,36,.5)',
    };
  });

  const soloUnlocked =
    view === 'together'
      ? all.some((c) => c.who !== 'duo')
      : visible.some((c) => c.who === view);

  const achDefs: { icon: string; title: string; cond: string; u: boolean }[] = [
    { icon: '🛂', title: 'First Stamp', cond: 'first country', u: count > 0 },
    { icon: '👫', title: 'Dynamic Duo', cond: 'first trip as two', u: visible.some((c) => c.who === 'duo') },
    { icon: '🌍', title: 'Continent Set', cond: 'all 6 continents', u: continents.size >= TOTAL_CONTINENTS },
    { icon: '🏃', title: 'Solo Soul', cond: 'a country alone', u: soloUnlocked },
    { icon: '🔥', title: 'On a Roll', cond: '3 in one season', u: count >= 3 },
    { icon: '🎯', title: 'Halfway', cond: '15 of 30', u: count >= 15 },
    { icon: '🌐', title: 'World Citizen', cond: 'all 30 done', u: count >= TARGET_COUNT },
    { icon: '⏰', title: 'Under the Wire', cond: 'within 7 days', u: false },
  ];
  const achievements: AchievementModel[] = achDefs.map((a, idx) => ({
    icon: a.icon,
    title: a.title,
    cond: a.cond,
    rot: ACH_ROTS[idx],
    unlocked: a.u,
    bg: a.u ? '#FBF8F1' : 'rgba(240,236,224,.7)',
    border: a.u ? '#E4D2AE' : 'rgba(74,58,40,.12)',
    titleColor: a.u ? '#463524' : 'rgba(70,53,36,.45)',
  }));
  const achUnlocked = achDefs.filter((a) => a.u).length;

  const tripNotes: TripNoteModel[] = [
    {
      icon: '✈️',
      label: 'Furthest we’ve been',
      value: furthest ? `${furthest.name} · ${furthest.km.toLocaleString()} km` : '…',
      rot: '-0.8deg',
      tape: NOTE_TAPES[0],
    },
    {
      icon: '📍',
      label: 'Most recent stamp',
      value: mostRecentLabel(visible),
      rot: '0.9deg',
      tape: NOTE_TAPES[1],
    },
    { icon: '🔥', label: 'Best streak', value: '3 countries in one season', rot: '-0.6deg', tape: NOTE_TAPES[2] },
    {
      icon: '⚡',
      label: 'Current pace',
      value: `${remaining} to go · … days left`,
      rot: '0.7deg',
      tape: NOTE_TAPES[3],
      live: 'pace',
    },
  ];

  return {
    view,
    theme,
    tabs,
    count,
    remaining,
    progressPct,
    ringOffset,
    heroTitle,
    heroSub,
    levelLabel,
    xpLabel: XP_LABELS[view],
    avatarInitials,
    mapPins,
    mapLinks,
    stats,
    cards,
    ghosts,
    continentBadges,
    achievements,
    achUnlocked,
    tripNotes,
  };
}

function mostRecentLabel(list: Country[]): string {
  if (list.length === 0) return '…';
  const last = list.reduce((m, c) =>
    new Date(c.dateVisited) > new Date(m.dateVisited) ? c : m,
  );
  const daysSince = Math.round((Date.now() - new Date(last.dateVisited).getTime()) / 86_400_000);
  return `${last.name} · ${daysSince} days ago`;
}

/**
 * Hero souvenir for a card: the shared shot, falling back to the solo
 * traveller's own photo when there's no shared one (undefined → placeholder).
 */
function photoFor(c: Country): string | undefined {
  if (!c.photos) return undefined;
  if (c.photos.shared) return c.photos.shared;
  if (c.who === 'bhavya') return c.photos.bhavya;
  if (c.who === 'shraddha') return c.photos.shraddha;
  return undefined;
}

export { countryXp };
