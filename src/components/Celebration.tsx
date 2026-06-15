import { useMemo } from 'react';
import { Heart } from './Doodles';

const COLORS = ['#B0503C', '#D9B26A', '#A7B79A', '#BBA0C6', '#92AEC6', '#C49BB0'];

/**
 * Full-screen "World Citizen" celebration for completing all 30 countries —
 * a rain of heart confetti behind a banner. Shown when the challenge is done
 * (and previewable via the `?celebrate=1` query param).
 */
export function Celebration({ onClose }: { onClose: () => void }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.round(Math.random() * 18),
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 4,
        color: COLORS[i % COLORS.length],
      })),
    [],
  );

  return (
    <div className="celebrate" role="dialog" aria-label="World citizen — all 30 countries complete">
      <div className="celebrate__sky" aria-hidden="true">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="celebrate__heart"
            style={{
              left: `${h.left}%`,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
            }}
          >
            <Heart size={h.size} color={h.color} />
          </span>
        ))}
      </div>

      <div className="celebrate__banner">
        <div className="celebrate__kicker">30 OF 30 · CHALLENGE COMPLETE</div>
        <h2 className="celebrate__title">World Citizen</h2>
        <p className="celebrate__sub">Every country, before thirty — together ♥</p>
        <button className="celebrate__btn" onClick={onClose}>
          Keep the memories
        </button>
      </div>
    </div>
  );
}
