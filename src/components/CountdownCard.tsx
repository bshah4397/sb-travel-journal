import type { Countdown } from '@/lib/journal';
import { fmtFull } from '@/lib/model';

/**
 * Boarding-pass countdown ticket. `featured` paints the day count in the
 * accent ink; `urgent` (<30 days) flips the whole thing to stamp-red
 * "final stretch" styling.
 */
export function CountdownCard({
  name,
  targetIso,
  cd,
  featured,
  accentInk,
  accentSoft,
  rot,
}: {
  name: string;
  targetIso: string;
  cd: Countdown;
  featured: boolean;
  accentInk: string;
  accentSoft: string;
  rot: string;
}) {
  const urgent = cd.urgent;
  const ink = urgent ? '#B0503C' : accentInk;
  const daysColor = featured ? ink : '#463524';
  const stubBg = featured ? (urgent ? '#F4E2D8' : accentSoft) : '#EFE7D4';

  return (
    <div className="boarding" style={{ transform: `rotate(${rot})` }}>
      <div className="boarding__body">
        <div className="boarding__stub">
          <div className="boarding__head">
            <span className="boarding__route" style={{ color: ink }}>
              {urgent ? '✈ FINAL STRETCH' : '✈ BOARDING PASS'}
            </span>
            <span className="boarding__date">{fmtFull(targetIso)}</span>
          </div>
          <div className="boarding__name">{name} turns 30</div>
          <div className="boarding__nums">
            <span className="boarding__days" style={{ color: daysColor }}>
              {cd.days}
            </span>
            <span className="boarding__days-cap">days</span>
            <span className="boarding__clock">
              {cd.hrs}:{cd.mins}:{cd.secs}
            </span>
          </div>
          <div className="boarding__barcode" />
        </div>

        <div className="boarding__perf">
          <span />
          <span />
        </div>

        <div className="boarding__gate" style={{ background: stubBg }}>
          <span className="boarding__gate-cap" style={{ color: ink }}>
            GATE 30
          </span>
          <span className="boarding__gate-num" style={{ color: ink }}>
            {cd.days}
          </span>
          <span className="boarding__gate-days">DAYS</span>
        </div>
      </div>
    </div>
  );
}
