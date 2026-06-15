import type { CardModel, GhostModel } from '@/lib/model';
import { PhotoSlot } from './PhotoSlot';
import { Heart } from './Doodles';

/**
 * A visited country as a taped polaroid. Click → opens the detail modal.
 *
 * The entrance fade-up lives on the outer cell (CSS keyframe, staggered by
 * index) while the resting rotation + hover lift live on the inner button …
 * keeping the two transforms from fighting each other.
 */
export function CountryCard({
  card,
  index,
  onOpen,
}: {
  card: CardModel;
  index: number;
  onOpen: (id: string) => void;
}) {
  return (
    <div className="card-cell" style={{ animationDelay: `${Math.min(index * 0.03, 0.4)}s` }}>
      <button
        type="button"
        className="polaroid"
        style={{ transform: `rotate(${card.rot})` }}
        onClick={() => onOpen(card.id)}
        aria-label={`Open ${card.name} souvenir`}
      >
        <span
          className="polaroid__tape"
          style={{ background: card.tapeColor, transform: `translateX(-50%) rotate(${card.tapeRot})` }}
        />

        <div className="polaroid__photo">
          <PhotoSlot src={card.photo} alt={`${card.name} souvenir`} />
          <span className="polaroid__corner polaroid__corner--tl" />
          <span className="polaroid__corner polaroid__corner--br" />
          <span className="polaroid__no">No. {card.nn}</span>

          {card.who === 'duo' ? (
            <div className="polaroid__stamp polaroid__stamp--heart">
              <Heart size={62} outline />
              <span className="polaroid__stamp-heart">
                <small style={{ fontSize: 6 }}>TOGETHER</small>
                <small style={{ fontSize: 5.5 }}>{card.stampDate}</small>
              </span>
            </div>
          ) : (
            <div className="polaroid__stamp">
              <span className="polaroid__stamp-ring">
                <small style={{ fontSize: 7 }}>VISITED</small>
                <span style={{ fontSize: 15 }}>{card.flag}</span>
                <small style={{ fontSize: 5.5 }}>{card.stampDate}</small>
              </span>
            </div>
          )}
        </div>

        <div className="polaroid__caption">
          <div className="polaroid__caption-row">
            <span style={{ fontSize: 17, lineHeight: 1 }}>{card.flag}</span>
            <span className="polaroid__name">{card.name}</span>
            <span className="polaroid__month">{card.month}</span>
          </div>
          <div className="polaroid__meta">
            <span className="polaroid__cont">
              <span className="polaroid__cont-dot" style={{ background: card.contColor }} />
              {card.continent}
            </span>
            <span className="polaroid__who" style={{ background: card.whoBg, color: card.whoFg }}>
              {card.whoLabel}
            </span>
          </div>
          {card.milestone && (
            <div className="polaroid__milestone">
              <Heart size={9} />
              {card.milestone}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

/** A not-yet-visited slot, dashed placeholder that creates anticipation. */
export function GhostCard({ ghost }: { ghost: GhostModel }) {
  return (
    <div className="ghost" style={{ transform: `rotate(${ghost.rot})` }}>
      <span
        className="ghost__tape"
        style={{ transform: `translateX(-50%) rotate(${ghost.tapeRot})` }}
      />
      <div className="ghost__photo">
        <span className="ghost__q">?</span>
        <span className="ghost__no">No. {ghost.nn}</span>
      </div>
      <div className="ghost__caption">somewhere new…</div>
    </div>
  );
}
