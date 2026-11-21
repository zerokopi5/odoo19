# AGENTS.md — odoo19 video workspace

Instructions for opencode sessions working in this repo (local or Codespaces).

## What this repo is

Remotion (React -> MP4) video project. Videos are code: compositions in `src/`,
registered in `src/Root.tsx`. ffmpeg is available for post-processing.

## Commands

| Task | Command |
| --- | --- |
| Install deps | `npm ci` (or `npm install`) |
| Studio (preview) | `npm run dev` → port 3000 |
| Render vertical | `npm run render:promo` |
| Render landscape | `npm run render:wide` |
| Render any comp | `npx remotion render src/index.ts <Id> out/<name>.mp4` |
| Single still | `npx remotion still src/index.ts <Id> out/frame.png --frame=45` |
| Typecheck | `npm run typecheck` |

Renders land in `out/` (git-ignored). Do not commit media.

## Conventions

- One composition per file under `src/compositions/`, named export matching the file.
- Props type lives next to the composition; defaults in `src/props.ts`.
- Sizes: vertical `1080x1920`, landscape `1920x1080`, square `1080x1080`.
- 30fps default. Keep durations as `fps * seconds`.
- Animate with `spring()` / `interpolate()` from `remotion` — never CSS keyframes,
  they are not deterministic per frame.
- No `Date.now()`, `Math.random()`, or network fetches during render.
- Use `staticFile()` for assets in `public/`; keep them under ~10 MB.
- Fonts: system stack by default; if a custom font is needed use `@remotion/google-fonts`.

## ffmpeg helpers

`source tools/ffmpeg-helpers.sh` then use `vcompress`, `vgif`, `vcover`, `vthumb`,
`vprobe`, `vconcat`.

## Secrets — hard rule

- **Never** commit credentials: no `~/.config/opencode`, no `auth.json`, no
  `opencode.json` containing keys, no `.env`, no PATs, no SSH private keys.
- Provider keys come from Codespaces secrets / environment variables
  (`OPENROUTER_API_KEY`, `ANTHROPIC_API_KEY`, ...). opencode reads them from env.
- `.githooks/pre-commit` blocks common credential patterns. Do not bypass it
  with `--no-verify`.
- If a key ever lands in a commit, rotate it first, then clean history.

## Git

- Default branch `main`, remote `origin` (`github.com:zerokopi5/odoo19`).
- Ask before rewriting history or force-pushing.
