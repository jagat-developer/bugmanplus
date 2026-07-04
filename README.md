# Bugman Plus Premium Website

Generated static, multi-page website for Bugman Plus.

## Commands

- `npm run build` regenerates the production site into `public/`.
- `npm run preview` rebuilds and serves `public/` at `http://localhost:4173`.

The service and location SEO pages are generated from shared service/location data in `scripts/build.mjs`. The current programmatic SEO focus is Durham Region plus select GTA service areas, with 20 priority services mapped across 19 municipalities, communities, and regional pages.

## Vercel

`vercel.json` sets `public` as the output directory, which is required because Vercel runs `npm run build` before deploying this static site.
