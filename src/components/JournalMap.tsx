import { palette } from '@/theme/tokens';
import type { JournalModel } from '@/lib/model';
import { Heart } from './Doodles';

/**
 * Aged map panel: dotted grid, dashed route lines between visited countries,
 * pulsing pins, and a wax-seal progress ring.
 */
export function JournalMap({ model }: { model: JournalModel }) {
  const { mapPins, mapLinks, ringOffset, count } = model;

  return (
    <div className="map-panel">
      <div className="map-panel__grid" />

      <svg
        className="map-panel__lines"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* the journey path between countries */}
        {mapLinks.map((lk, i) => (
          <line
            key={i}
            x1={lk.x1}
            y1={lk.y1}
            x2={lk.x2}
            y2={lk.y2}
            stroke={palette.mapInk}
            strokeWidth={0.32}
            strokeDasharray="1.1 1.1"
            opacity={0.65}
          />
        ))}
      </svg>

      {/* love hearts strung along the journey between countries */}
      {mapLinks.map((lk, i) => (
        <span
          key={`h${i}`}
          className="map-heart"
          style={
            {
              left: `${(lk.x1 + lk.x2) / 2}%`,
              top: `${(lk.y1 + lk.y2) / 2}%`,
              ['--r']: `${i % 2 ? 12 : -10}deg`,
              animationDelay: `${i * 0.3}s`,
            } as React.CSSProperties
          }
        >
          <Heart size={12} />
        </span>
      ))}

      {mapPins.map((pin) => (
        <div key={pin.name} className="map-pin" style={{ left: pin.left, top: pin.top }}>
          <span className="map-pin__pulse" style={{ animationDelay: pin.delay }} />
          <span className="map-pin__dot" />
          <span className="map-pin__label">
            {pin.flag} {pin.name}
            {pin.isDuo && <span className="map-pin__heart">♥</span>}
          </span>
        </div>
      ))}

      <div className="map-seal">
        <svg width="124" height="124" viewBox="0 0 160 160">
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
