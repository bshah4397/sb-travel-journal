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
  const { ringOffset, count, view } = model;

  const visited = countriesForView(view);
  const fillByIso = new Map<string, string>();
  visited.forEach((c) => fillByIso.set(String(c.iso), PASTEL[c.continent]));

  const labels: { id: string; name: string; x: number; y: number; pin: boolean }[] = [];
  const seen = new Set<string>();
  visited.forEach((c) => {
    const id = String(c.iso);
    if (seen.has(id)) return;
    seen.add(id);
    const name = ISO_NAME[id] ?? c.name;
    if (PRESENT.has(id)) {
      const shape = SHAPES.find((s) => s.id === id)!;
      labels.push({ id, name, x: shape.centroid[0], y: shape.centroid[1], pin: false });
    } else if (PIN_COORDS[id]) {
      const p = projection(PIN_COORDS[id]);
      if (p) labels.push({ id, name, x: p[0], y: p[1], pin: true });
    }
  });

  return (
    <div className="map-panel">
      <div className="map-panel__grid" />

      <svg
        className="world-map"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {SHAPES.map((s, i) => {
          const fill = fillByIso.get(s.id);
          return (
            <path
              key={i}
              d={s.d}
              fill={fill ?? '#e7dcc1'}
              stroke={fill ? '#6b5640' : '#b6a589'}
              strokeWidth={fill ? 0.6 : 0.4}
              strokeLinejoin="round"
            />
          );
        })}

        {labels.map((l) => (
          <g key={l.id}>
            {l.pin && <circle cx={l.x} cy={l.y} r={2.2} fill="#a8432c" />}
            <text
              className="world-map__label"
              x={l.x}
              y={l.pin ? l.y - 5 : l.y}
              textAnchor="middle"
            >
              {l.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="map-seal">
        <svg width="112" height="112" viewBox="0 0 160 160">
          <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(74,58,40,.16)" strokeWidth="11" />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="var(--accent-ink)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray="440"
            strokeDashoffset={ringOffset}
            style={{ animation: 'drawRing 1.3s cubic-bezier(.2,.8,.2,1)' }}
          />
        </svg>
        <div className="map-seal__center">
          <span className="map-seal__num">{count}</span>
          <span className="map-seal__cap">OF 30</span>
        </div>
      </div>

      <span className="map-label">the map so far ✈ ♥</span>
    </div>
  );
}
