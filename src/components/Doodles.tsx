import { palette } from '@/theme/tokens';

const HEART_PATH =
  'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';

/** A small ink heart. Filled by default; `outline` for a hand-drawn stroke. */
export function Heart({
  size = 14,
  color = palette.stampRed,
  outline = false,
  style,
}: {
  size?: number;
  color?: string;
  outline?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{ display: 'block', ...style }}
    >
      <path
        d={HEART_PATH}
        fill={outline ? 'none' : color}
        stroke={outline ? color : 'none'}
        strokeWidth={outline ? 2 : 0}
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Faint margin doodles scattered across the journal sheet — hearts, a little
 * dashed plane trail, a star — like ink scribbles in a real travel diary.
 * Purely decorative; sits behind the content.
 */
export function SheetDoodles() {
  const ink = 'rgba(74,58,40,.18)';
  const blush = 'rgba(176,80,60,.32)';
  return (
    <div className="sheet__doodles" aria-hidden="true">
      <Heart size={22} color={blush} style={{ position: 'absolute', top: 96, right: 38, transform: 'rotate(12deg)' }} />
      <Heart size={13} color={blush} outline style={{ position: 'absolute', top: 132, right: 70, transform: 'rotate(-10deg)' }} />

      {/* dashed plane trail */}
      <svg width="120" height="54" viewBox="0 0 120 54" style={{ position: 'absolute', top: 80, left: 30 }}>
        <path d="M4 50 Q40 6 78 22" fill="none" stroke={ink} strokeWidth="1.4" strokeDasharray="3 4" strokeLinecap="round" />
        <path d="M76 14 l12 8 -12 8 3 -8 z" fill={ink} />
      </svg>

      <Heart size={16} color={blush} outline style={{ position: 'absolute', bottom: 150, left: 44, transform: 'rotate(-14deg)' }} />
      <Heart size={11} color={blush} style={{ position: 'absolute', bottom: 120, left: 74, transform: 'rotate(8deg)' }} />

      {/* little star */}
      <svg width="20" height="20" viewBox="0 0 24 24" style={{ position: 'absolute', bottom: 220, right: 52, transform: 'rotate(6deg)' }}>
        <path d="M12 3 l2.2 6.3 6.6 .2 -5.3 4 2 6.3 -5.5-3.9 -5.5 3.9 2-6.3 -5.3-4 6.6-.2z" fill="none" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
