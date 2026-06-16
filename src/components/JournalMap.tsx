import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldTopo from 'world-atlas/countries-110m.json';
import { countriesForView } from '@/lib/journal';
import type { Continent } from '@/theme/tokens';
import type { JournalModel } from '@/lib/model';

/**
 * Real world map: every country outlined in thin ink, the ones we've
 * visited washed in their continent's pastel and labelled by name.
 * Tiny countries the low-res outlines drop (Singapore, Vatican) get a pin.
 * A wax-seal ring keeps the running count.
 */

const W = 640;
const H = 380;

// Precomputed once at module load: project every country to flat path data.
const topo = worldTopo as unknown as {
  objects: { countries: unknown };
};
const collection = feature(
  worldTopo as never,
  topo.objects.countries as never,
) as unknown as { features: Array<{ id?: string | number }> };
const features = collection.features;
const projection = geoNaturalEarth1().fitExtent(
  [
    [8, 14],
    [W - 8, H - 14],
  ],
  collection as never,
);
const pathGen = geoPath(projection);
const SHAPES = features.map((f) => ({
  id: String(f.id),
  d: pathGen(f as never) || '',
  centroid: pathGen.centroid(f as never),
}));
const PRESENT = new Set(SHAPES.map((s) => s.id));

const PASTEL: Record<Continent, string> = {
  Europe: '#C9B6E0',
  Americas: '#F2C6B8',
  Asia: '#F4D6A8',
  Africa: '#B9D9C9',
  Oceania: '#AEC9E8',
  Antarctica: '#D9E2E8',
};

// Nice display names per ISO (collapses England + Scotland into one UK label).
const ISO_NAME: Record<string, string> = {
  '784': 'UAE',
  '360': 'Indonesia',
  '702': 'Singapore',
  '36': 'Australia',
  '356': 'India',
  '724': 'Spain',
  '826': 'United Kingdom',
  '840': 'United States',
  '124': 'Canada',
  '380': 'Italy',
  '336': 'Vatican City',
  '428': 'Latvia',
};

// Lng/lat for visited countries too small to appear in the outlines.
const PIN_COORDS: Record<string, [number, number]> = {
  '702': [103.8, 1.35],
  '336': [12.45, 41.9],
};

export function JournalMap({ model }: { model: JournalModel }) {
  const { view } = model;

  const visited = countriesForView(view);
  const fillByIso = new Map<string, string>();
  visited.forEach((c) => fillByIso.set(String(c.iso), PASTEL[c.continent]));

  // One mark per visited country (deduped by ISO), in chronological order so
  // the dashed route threads the journey.
  const marks: { iso: string; name: string; x: number; y: number; color: string }[] = [];
  const seen = new Set<string>();
  [...visited]
    .sort((a, b) => (a.dateVisited < b.dateVisited ? -1 : 1))
    .forEach((c) => {
      const id = String(c.iso);
      if (seen.has(id)) return;
      seen.add(id);
      const color = PASTEL[c.continent];
      const name = ISO_NAME[id] ?? c.name;
      if (PRESENT.has(id)) {
        const shape = SHAPES.find((s) => s.id === id)!;
        marks.push({ iso: id, name, x: shape.centroid[0], y: shape.centroid[1], color });
      } else if (PIN_COORDS[id]) {
        const p = projection(PIN_COORDS[id]);
        if (p) marks.push({ iso: id, name, x: p[0], y: p[1], color });
      }
    });

  const routeD = marks.map((m, i) => `${i ? 'L' : 'M'}${m.x.toFixed(1)} ${m.y.toFixed(1)}`).join(' ');

  return (
    <div className="map-panel">
      <div className="map-panel__grid" />

      <svg
        className="world-map"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="mapWobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" />
          </filter>
        </defs>

        {/* soft watercolour fills, nudged off the inked border */}
        <g transform="translate(1.4,2)" opacity="0.42">
          {SHAPES.filter((s) => fillByIso.has(s.id)).map((s, i) => (
            <path key={i} d={s.d} fill={fillByIso.get(s.id)} />
          ))}
        </g>

        {/* stippled coastlines */}
        {SHAPES.map((s, i) => {
          const v = fillByIso.has(s.id);
          return (
            <path
              key={i}
              d={s.d}
              fill="none"
              stroke={v ? '#6b5640' : '#b6a589'}
              strokeWidth={v ? 0.9 : 0.5}
              strokeDasharray={v ? '0.6 2.3' : '0.5 2.2'}
              strokeLinecap="round"
            />
          );
        })}

        {/* dashed travel route threading the journey */}
        {marks.length > 1 && (
          <path
            d={routeD}
            fill="none"
            stroke="#a8432c"
            strokeWidth="1"
            strokeDasharray="2 4.5"
            strokeLinecap="round"
            opacity="0.5"
            filter="url(#mapWobble)"
          />
        )}

        {/* doodle pins + hand-lettered labels */}
        {marks.map((m) => (
          <g key={m.iso} transform={`translate(${m.x.toFixed(1)},${m.y.toFixed(1)})`}>
            <g filter="url(#mapWobble)">
              <path
                d="M0 0 C-7 -10 -6 -18 0 -18 C6 -18 7 -10 0 0 Z"
                fill={m.color}
                stroke="#3b3b3b"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              <circle cx="0" cy="-11.5" r="2.5" fill="#fbf7ec" stroke="#3b3b3b" strokeWidth="0.8" />
            </g>
            <text className="world-map__label" x="0" y="9" textAnchor="middle">
              {m.name}
            </text>
          </g>
        ))}
      </svg>

      <span className="map-label">the map so far ✈ ♥</span>
    </div>
  );
}
