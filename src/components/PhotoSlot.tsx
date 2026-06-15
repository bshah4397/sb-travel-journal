/**
 * Souvenir photo slot. Renders the image when a static asset path is present,
 * otherwise a striped placeholder with a hint, so the grid looks intentional
 * until real photos are committed to /public.
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
  if (src) {
    return <img className="photo-slot" src={src} alt={alt ?? ''} loading="lazy" />;
  }
  return (
    <div className="photo-slot" role="img" aria-label={alt ?? hint}>
      <span className="photo-slot__hint">{hint}</span>
    </div>
  );
}
