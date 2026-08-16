# Souvenir photos

Drop photos here and they show up automatically — no code changes.

## Where

One folder per country, named by its `id` in `src/data/countries.ts`:

```
src/assets/countries/<id>/
```

(e.g. `france`, `japan`, `switzerland`. The folders are already created for
every country in the data.)

## Filenames (exact, lowercase)

| File | Shows up as |
| --- | --- |
| `shared.jpg` | the couple / main photo — the card image for trips you did together, and the big photo in the pop-up |
| `bhavya.jpg` | Bhavya's own shot — a side snap in the pop-up; also the card image for Bhavya's solo trips |
| `shraddha.jpg` | Shraddha's own shot — same, for Shraddha |

- **Together trip** → add `shared.jpg` (optionally add each person's too).
- **Solo trip** → add just that person's file.
- `.jpg`, `.jpeg`, `.png`, and `.webp` all work.

## Format

- **Square** images look best — every slot is cropped to a square, so a square
  keeps the whole photo. Non-square is fine too; it's centre-cropped, so keep
  the subject centred.
- ~1200×1200px is plenty. Keep each file **under ~400 KB** (they're committed
  to git and served to every visitor).

## Then

Commit and push. Vercel redeploys automatically. Any country without photos
keeps its striped placeholder — nothing breaks.
