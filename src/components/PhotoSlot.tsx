import { useState } from 'react';

/**
 * Souvenir photo slot. Renders the image when a bundled asset URL is present,
 * otherwise a striped placeholder with a hint — so the grid looks intentional
 * until real photos are dropped into src/assets/countries/<id>/. If an image
 * ever fails to load, it falls back to the placeholder rather than a broken
 * icon.
 */
export function PhotoSlot({
  src,
  alt,
  hint = 'SOUVENIR',
}: {
  src?: string;
  alt?: string;
  hint?: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (src && src !== failedSrc) {
    return (
      <img
        className="photo-slot"
        src={src}
        alt={alt ?? ''}
        loading="lazy"
        onError={() => setFailedSrc(src)}
      />
    );
  }
  return (
    <div className="photo-slot" role="img" aria-label={alt ?? hint}>
      <span className="photo-slot__hint">{hint}</span>
    </div>
  );
}
