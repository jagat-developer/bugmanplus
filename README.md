# Bugman Plus Premium Website

Generated static, multi-page website for Bugman Plus.

## Commands

- `npm run build` regenerates the production site into `public/`.
- `npm run preview` rebuilds and serves `public/` at `http://localhost:4173`.

The service and location SEO pages are generated from shared service/location data in `scripts/build.mjs`.

## Vercel

`vercel.json` sets `public` as the output directory, which is required because Vercel runs `npm run build` before deploying this static site.
