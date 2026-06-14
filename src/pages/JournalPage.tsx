import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RACERS } from '@/data/countries';
import { countdown, statsForView } from '@/lib/journal';
import { fonts, palette, viewThemes, type ViewKey } from '@/theme/tokens';

const TABS: { key: ViewKey; label: string; to: string }[] = [
  { key: 'together', label: 'Together', to: '/' },
  { key: 'bhavya', label: 'Bhavya', to: '/bhavya' },
  { key: 'shraddha', label: 'Shraddha', to: '/shraddha' },
];

/**
 * SCAFFOLD placeholder. Renders a live, themed skeleton (nav, view title,
 * progress, ticking countdowns) to prove the data + routing + theming layers
 * are wired. The full journal UI — map, polaroid grid, continents,
 * achievements, modal — will replace this body in the build phase.
 */
export function JournalPage({ view }: { view: ViewKey }) {
  const theme = viewThemes[view];
  const stats = statsForView(view);

  // Live clock, ticking once per second.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const cdB = countdown(RACERS.bhavya.turns30, now);
  const cdS = countdown(RACERS.shraddha.turns30, now);

  return (
    <main style={{ maxWidth: 1480, margin: '0 auto', padding: '52px 40px 130px' }}>
      <nav style={{ display: 'flex', gap: 6, marginBottom: 28 }}>
        {TABS.map((tab) => (
          <NavLink
            key={tab.key}
            to={tab.to}
            end={tab.to === '/'}
            style={({ isActive }) => ({
              textDecoration: 'none',
              fontFamily: fonts.mono,
              fontSize: 12,
              letterSpacing: '0.05em',
              padding: '9px 20px',
              borderRadius: '9px 9px 3px 3px',
              color: palette.ink,
              background: isActive ? viewThemes[tab.key].mid : 'rgba(251,247,236,.5)',
              opacity: isActive ? 1 : 0.7,
            })}
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>

      <h1 style={{ fontFamily: fonts.display, fontWeight: 700, fontSize: 58, margin: '0 0 8px', color: palette.ink }}>
        {stats.count} stamps, {stats.remaining} to go.
      </h1>
      <p style={{ fontFamily: fonts.display, fontSize: 22, color: theme.ink, margin: '0 0 32px' }}>
        Viewing: {view} · {stats.continents.size} continents · furthest:{' '}
        {stats.furthest?.name ?? '—'}
      </p>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[
          { racer: RACERS.bhavya.name, cd: cdB },
          { racer: RACERS.shraddha.name, cd: cdS },
        ].map(({ racer, cd }) => (
          <div
            key={racer}
            style={{
              fontFamily: fonts.body,
              background: palette.cardCream,
              border: '1px solid rgba(74,58,40,.16)',
              borderRadius: 10,
              padding: '14px 18px',
              minWidth: 220,
            }}
          >
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.12em', color: cd.urgent ? palette.stampRed : theme.ink }}>
              ✈ {racer.toUpperCase()} TURNS 30
            </div>
            <div style={{ fontWeight: 900, fontSize: 33, color: cd.urgent ? palette.stampRed : palette.ink }}>
              {cd.days}
              <span style={{ fontFamily: fonts.mono, fontSize: 12, fontWeight: 400 }}> days</span>
              <span style={{ marginLeft: 12, fontFamily: fonts.mono, fontSize: 14 }}>
                {cd.hrs}:{cd.mins}:{cd.secs}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 40, fontFamily: fonts.mono, fontSize: 11, color: 'rgba(70,53,36,.5)' }}>
        SCAFFOLD — full journal UI pending build phase.
      </p>
    </main>
  );
}
