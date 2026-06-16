import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES, RACERS } from '@/data/countries';
import { countdown, countriesForView } from '@/lib/journal';
import { PassportTracker, type PassportRacer } from '@/components/PassportTracker';
import { buildModel } from '@/lib/model';
import { TARGET_COUNT, viewThemes, type ViewKey } from '@/theme/tokens';
import { CountdownCard } from '@/components/CountdownCard';
import { JournalMap } from '@/components/JournalMap';
import { CountryCard, GhostCard } from '@/components/CountryCard';
import { CountryModal } from '@/components/CountryModal';
import { Heart, SheetDoodles } from '@/components/Doodles';
import { Celebration } from '@/components/Celebration';
import '@/styles/journal.css';

/** Ticking wall clock, one update per second. */
function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function JournalPage({ view }: { view: ViewKey }) {
  const model = useMemo(() => buildModel(view), [view]);
  const theme = viewThemes[view];
  const now = useNow();

  const [openId, setOpenId] = useState<string | null>(null);
  const openCountry = openId ? COUNTRIES.find((c) => c.id === openId) ?? null : null;

  // Celebrate on completion (or via ?celebrate=1 to preview the moment).
  const [celebrating, setCelebrating] = useState(
    () =>
      model.count >= TARGET_COUNT ||
      new URLSearchParams(window.location.search).get('celebrate') === '1',
  );

  const cdB = countdown(RACERS.bhavya.turns30, now);
  const cdS = countdown(RACERS.shraddha.turns30, now);

  const passportRacers: PassportRacer[] = [
    {
      name: RACERS.bhavya.name,
      initial: RACERS.bhavya.initial,
      count: countriesForView('bhavya').length,
      target: TARGET_COUNT,
      days: cdB.days,
      cover: '#F1DCE4',
      bar: '#C98CA6',
      rot: '-3deg',
      delay: '0s',
    },
    {
      name: RACERS.shraddha.name,
      initial: RACERS.shraddha.initial,
      count: countriesForView('shraddha').length,
      target: TARGET_COUNT,
      days: cdS.days,
      cover: '#E7DCF0',
      bar: '#9B7FC4',
      rot: '3deg',
      delay: '0.12s',
    },
  ];

  const cssVars = {
    ['--accent']: theme.mid,
    ['--accent-ink']: theme.ink,
    ['--accent-pastel']: theme.pastel,
    ['--accent-soft']: theme.soft,
  } as React.CSSProperties;

  const lockedContinents = model.continentBadges.filter((c) => !c.unlocked).length;

  return (
    <div className="journal" style={cssVars}>
      <div className="journal__meta">
        <span>30 Under 30 · Travel Journal</span>
        <span className="journal__meta-script">
          {view === 'together'
            ? 'Together · the shared race'
            : view === 'bhavya'
              ? 'Bhavya · solo pages'
              : 'Shraddha · solo pages'}
        </span>
      </div>

      <div className="sheet-wrap">
        {/* washi tape holding the page */}
        <span
          className="washi-anchor"
          style={{ top: -14, left: 64, width: 120, height: 32, background: '#A7B79A', opacity: 0.72, transform: 'rotate(-5deg)' }}
        />
        <span
          className="washi-anchor"
          style={{ top: -13, right: 78, width: 108, height: 30, background: '#D9B26A', opacity: 0.72, transform: 'rotate(4deg)' }}
        />

        <div className="sheet">
          <div className="sheet__border" />
          <SheetDoodles />

          {/* ── NAV ── */}
          <nav className="nav">
            <div className="nav__brand">
              <div className="nav__logo">30</div>
              <div className="nav__brand-text">
                <span className="nav__title">UNDER 30</span>
                <span className="nav__subtitle">Bhavya &amp; Shraddha's travel journal</span>
              </div>
            </div>

            <div className="nav__tabs">
              {model.tabs.map((tab) => (
                <Link
                  key={tab.key}
                  to={tab.to}
                  className={tab.active ? 'tab tab--active' : 'tab'}
                >
                  {tab.label}
                </Link>
              ))}
            </div>

            <div className="nav__profile">
              <div className="nav__level">
                <span className="nav__level-name">{model.levelLabel}</span>
                <span className="nav__level-xp">{model.xpLabel}</span>
              </div>
              <div className="nav__avatar">
                <span>{model.avatarInitials}</span>
              </div>
            </div>
          </nav>

          {/* ── HERO ── */}
          <section className="section">
            <div className="hero-grid">
              <div className="hero-left">
                <div className="duo-badge">
                  <span className="duo-badge__tape" />
                  <span className="duo-badge__avatars">
                    <span className="avatar-dot" style={{ background: '#92AEC6' }}>B</span>
                    <span className="avatar-dot" style={{ background: '#BBA0C6' }}>S</span>
                  </span>
                  <span className="duo-badge__label">Bhavya &amp; Shraddha · on a mission ♥</span>
                </div>

                <div>
                  <h2 className="hero-title">{model.heroTitle}</h2>
                  <p className="hero-sub">{model.heroSub}</p>
                </div>

                <div>
                  <div className="progress__head">
                    <span className="progress__label">Countries logged</span>
                    <span className="progress__count">
                      <b>{model.count}</b> of 30
                    </span>
                  </div>
                  <div className="progress__track">
                    <div className="progress__fill" style={{ width: `${model.progressPct}%` }} />
                  </div>
                </div>

                <div className="countdowns">
                  <CountdownCard
                    name={RACERS.bhavya.name}
                    targetIso={RACERS.bhavya.turns30}
                    cd={cdB}
                    featured={view !== 'shraddha'}
                    accentInk={viewThemes.bhavya.ink}
                    accentSoft={viewThemes.bhavya.soft}
                    rot="-1.2deg"
                  />
                  <CountdownCard
                    name={RACERS.shraddha.name}
                    targetIso={RACERS.shraddha.turns30}
                    cd={cdS}
                    featured={view === 'shraddha'}
                    accentInk={viewThemes.shraddha.ink}
                    accentSoft={viewThemes.shraddha.soft}
                    rot="1.1deg"
                  />
                </div>
              </div>

              <JournalMap model={model} />
            </div>

            {/* STATS · luggage tags */}
            <div className="stats-grid">
              {model.stats.map((st) => (
                <div key={st.label} className="luggage-tag" style={{ transform: `rotate(${st.rot})` }}>
                  <div className="luggage-tag__label">{st.label}</div>
                  <div className="luggage-tag__row">
                    <span className="luggage-tag__value">
                      {st.live === 'bhavyaDays' ? cdB.days : st.value}
                    </span>
                    <span className="luggage-tag__unit">{st.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── PASSPORT TRACKERS (Together only) ── */}
          {view === 'together' && <PassportTracker racers={passportRacers} />}

          {/* ── CONTINENTS ── */}
          <section className="section" style={{ paddingTop: 4, paddingBottom: 28 }}>
            <div className="sec-head">
              <span className="sec-head__title">Continents unlocked</span>
              <Heart size={13} style={{ opacity: 0.55, flexShrink: 0 }} />
              <span className="sec-head__rule" />
              <span className="sec-head__meta">
                {6 - lockedContinents} OF 6 · ANTARCTICA AWAITS
              </span>
            </div>
            <div className="continents-grid">
              {model.continentBadges.map((cb) => (
                <div
                  key={cb.name}
                  className="stamp"
                  style={{ transform: `rotate(${cb.rot})`, opacity: cb.unlocked ? 1 : 0.6 }}
                >
                  <div className="stamp__inner" style={{ ['--stamp-dash' as string]: cb.dash }}>
                    <div className="stamp__emoji" style={{ filter: cb.unlocked ? 'none' : 'grayscale(1)' }}>
                      {cb.emoji}
                    </div>
                    <div className="stamp__name" style={{ color: cb.nameColor }}>{cb.name}</div>
                    <div className="stamp__count">{cb.countLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── COLLECTION ── */}
          <section className="section" style={{ paddingTop: 8, paddingBottom: 30 }}>
            <div className="collection-head">
              <div>
                <h3 className="collection-head__title">The collection</h3>
                <p className="collection-head__sub">
                  {model.count} SOUVENIRS PASTED IN · {model.remaining} BLANK SPOTS LEFT
                </p>
              </div>
              <div className="legend">
                <span><span className="legend__dot" />visited</span>
                <span><span className="legend__dot legend__dot--blank" />blank</span>
              </div>
            </div>

            <div className="collection-grid">
              {model.cards.map((card, i) => (
                <CountryCard key={card.id} card={card} index={i} onOpen={setOpenId} />
              ))}
              {model.ghosts.map((g) => (
                <GhostCard key={g.n} ghost={g} />
              ))}
            </div>
          </section>

          {/* ── ACHIEVEMENTS + TRIP NOTES ── */}
          <section className="section" style={{ paddingTop: 8, paddingBottom: 40 }}>
            <div className="bottom-grid">
              <div>
                <div className="sec-head">
                  <span className="sec-head__title">Sticker badges</span>
                  <Heart size={13} style={{ opacity: 0.55, flexShrink: 0 }} />
                  <span className="sec-head__rule" />
                  <span className="sec-head__meta">{model.achUnlocked} EARNED</span>
                </div>
                <div className="ach-grid">
                  {model.achievements.map((a) => (
                    <div
                      key={a.title}
                      className="sticker"
                      style={{
                        transform: `rotate(${a.rot})`,
                        background: a.bg,
                        border: `2px solid ${a.border}`,
                        opacity: a.unlocked ? 1 : 0.6,
                      }}
                    >
                      <div className="sticker__icon" style={{ filter: a.unlocked ? 'none' : 'grayscale(1)' }}>
                        {a.icon}
                      </div>
                      <div className="sticker__title" style={{ color: a.titleColor }}>{a.title}</div>
                      <div className="sticker__cond">{a.cond}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="sec-head">
                  <span className="sec-head__title">Trip notes</span>
                  <Heart size={13} style={{ opacity: 0.55, flexShrink: 0 }} />
                  <span className="sec-head__rule" />
                </div>
                <div className="notes-list">
                  {model.tripNotes.map((f) => (
                    <div key={f.label} className="note" style={{ transform: `rotate(${f.rot})` }}>
                      <span className="note__tape" style={{ background: f.tape }} />
                      <div className="note__icon">{f.icon}</div>
                      <div style={{ lineHeight: 1.2 }}>
                        <div className="note__label">{f.label}</div>
                        <div className="note__value">
                          {f.live === 'pace'
                            ? `${model.remaining} to go · ${cdB.days} days left`
                            : f.value}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {openCountry && <CountryModal country={openCountry} onClose={() => setOpenId(null)} />}

      {celebrating && <Celebration onClose={() => setCelebrating(false)} />}
    </div>
  );
}
