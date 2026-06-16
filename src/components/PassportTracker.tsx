/**
 * Per-person progress trackers for the Together view: a doodled passport
 * per racer, the cover initial in signature script, a fill bar and the
 * live "N / 30 · D days" line. Two passports with a little travel trail
 * between them, the way a couple races the same clock from two birthdays.
 */
export interface PassportRacer {
  name: string;
  initial: string;
  count: number;
  target: number;
  days: number;
  /** Cover fill colour. */
  cover: string;
  /** Progress-bar fill colour. */
  bar: string;
  /** Resting tilt. */
  rot: string;
  /** Entrance stagger. */
  delay: string;
}

function Passport({ r }: { r: PassportRacer }) {
  const trackW = 86;
  const fill = Math.max(5, Math.min(trackW, (r.count / r.target) * trackW));
  return (
    <svg
      className="passport"
      viewBox="0 0 158 200"
      role="img"
      aria-label={`${r.name}: ${r.count} of ${r.target} countries, ${r.days} days to thirty`}
      style={{ ['--pr' as string]: r.rot, animationDelay: r.delay }}
    >
      <rect x="22" y="14" width="114" height="168" rx="11" fill={r.cover} stroke="#3B3B3B" strokeWidth="2.2" />
      <rect x="29" y="21" width="100" height="154" rx="8" fill="none" stroke="#3B3B3B" strokeWidth="0.8" opacity="0.4" />
      <text x="79" y="42" textAnchor="middle" className="passport__caps">PASSPORT</text>
      <circle cx="79" cy="70" r="17" fill="none" stroke="#3B3B3B" strokeWidth="1.6" />
      <ellipse cx="79" cy="70" rx="7" ry="17" fill="none" stroke="#3B3B3B" strokeWidth="1.1" />
      <line x1="62" y1="70" x2="96" y2="70" stroke="#3B3B3B" strokeWidth="1.1" />
      <text x="79" y="128" textAnchor="middle" className="passport__initial">{r.initial}</text>
      <rect x="36" y="138" width={trackW} height="9" rx="4.5" fill="none" stroke="#3B3B3B" strokeWidth="1" />
      <rect x="36" y="138" width={fill} height="9" rx="4.5" fill={r.bar} />
      <text x="79" y="166" textAnchor="middle" className="passport__meta">
        {r.count} / {r.target} · {r.days} days
      </text>
    </svg>
  );
}

function Trail() {
  return (
    <svg className="passport-trail" viewBox="0 0 64 50" aria-hidden="true">
      <path d="M4 38 q26 -34 56 -16" fill="none" stroke="#B98AA4" strokeWidth="1.6" strokeDasharray="3 4" strokeLinecap="round" />
      <path d="M52 16 l9 3 l-5 8 z" fill="#B98AA4" />
      <path d="M28 8 q3 -4 6 0 q3 -4 6 0 q0 5 -6 8 q-6 -3 -6 -8z" fill="#C98CA6" opacity="0.8" />
    </svg>
  );
}

export function PassportTracker({ racers }: { racers: PassportRacer[] }) {
  return (
    <section className="section passport-section">
      <div className="passport-panel">
        <span className="passport-panel__tape" />
        <h3 className="passport-panel__title">the race so far</h3>
        <p className="passport-panel__sub">TWO PASSPORTS · ONE COUNTDOWN TO THIRTY</p>
        <div className="passport-row">
          {racers.map((r, i) => (
            <div key={r.name} className="passport-cell">
              <Passport r={r} />
              {i === 0 && racers.length > 1 && <Trail />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
