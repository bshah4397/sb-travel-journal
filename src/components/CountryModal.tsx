import { useEffect } from 'react';
import type { Country } from '@/data/countries';
import { continentColors } from '@/theme/tokens';
import { countryXp, fmtFull } from '@/lib/model';
import { PhotoSlot } from './PhotoSlot';
import { Heart } from './Doodles';

const WHO_LABEL: Record<Country['who'], string> = {
  duo: 'Visited together',
  bhavya: 'Bhavya · solo',
  shraddha: 'Shraddha · solo',
};

/** Journal-spread detail view for one country. */
export function CountryModal({
  country,
  onClose,
}: {
  country: Country;
  onClose: () => void;
}) {
  // Close on Escape; lock body scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const contColor = continentColors[country.continent];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${country.name} journal entry`}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="modal__tape" />
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal__body">
          <div className="modal__hero" style={{ ['--tape' as string]: contColor }}>
            <span
              className="snap__tape"
              style={{ background: contColor, opacity: 0.7, width: 96, height: 26, top: -10, transform: 'translateX(-50%) rotate(-4deg)' }}
            />
            <div className="modal__hero-photo">
              <PhotoSlot src={country.photos?.shared} alt={`${country.name} shared souvenir`} hint="SHARED SOUVENIR" />
              <span className="polaroid__corner polaroid__corner--tl" />
            </div>
            <div className="modal__hero-cap">
              {country.flag} {country.name}
            </div>
          </div>

          <div style={{ paddingTop: 6 }}>
            <div className="modal__entry-meta">
              {fmtFull(country.dateVisited)} · {WHO_LABEL[country.who]}
            </div>
            {country.milestone && (
              <div className="modal__milestone">
                <Heart size={12} />
                {country.milestone}
              </div>
            )}
            <h3 className="modal__entry-title">Dear journal…</h3>
            <p className="modal__notes">“{country.notes}”</p>

            <div className="modal__chips">
              <span className="chip chip--cont">
                <span className="chip__dot" style={{ background: contColor }} />
                {country.continent}
              </span>
              <span className="chip chip--xp">+{countryXp(country)} XP</span>
              <span className="chip chip--km">{country.km.toLocaleString()} KM AWAY</span>
            </div>

            <div className="modal__snaps-head">
              {country.who === 'duo' ? "Both travellers' snaps" : 'A memory from the trip'}
            </div>
            <div className="modal__snaps">
              {(country.who === 'duo' || country.who === 'bhavya') && (
                <div className="snap" style={{ transform: 'rotate(-2deg)' }}>
                  <span className="snap__tape" style={{ background: '#92AEC6', transform: 'translateX(-50%) rotate(-5deg)' }} />
                  <div style={{ position: 'relative', height: 108 }}>
                    <PhotoSlot src={country.photos?.bhavya} alt="Bhavya's shot" hint="BHAVYA'S PHOTO" />
                  </div>
                  <div className="snap__cap">Bhavya's shot</div>
                </div>
              )}
              {(country.who === 'duo' || country.who === 'shraddha') && (
                <div className="snap" style={{ transform: 'rotate(1.8deg)' }}>
                  <span className="snap__tape" style={{ background: '#BBA0C6', transform: 'translateX(-50%) rotate(4deg)' }} />
                  <div style={{ position: 'relative', height: 108 }}>
                    <PhotoSlot src={country.photos?.shraddha} alt="Shraddha's shot" hint="SHRADDHA'S PHOTO" />
                  </div>
                  <div className="snap__cap">Shraddha's shot</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
