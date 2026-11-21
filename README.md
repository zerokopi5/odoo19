# odoo19 — video workspace

Remotion project for building videos with code, driven by **opencode**.
Ships as a **dev container**, so the intended workflow is a GitHub Codespace:
nothing to install locally.

- Quickstart (local): `npm install` → `npm run dev`
- **Codespaces setup: [docs/CODESPACE.md](docs/CODESPACE.md)**
- ffmpeg is used for post-processing (compress, GIF, cover, thumbnails).

## What's in the container

| Tool | Version source |
| --- | --- |
| Node.js | 22 (devcontainer base image) |
| ffmpeg | Debian apt |
| opencode | `scripts/install-opencode.sh` at create time (not baked into the image) |
| Chrome Headless Shell | `npx remotion browser ensure` at create time |

## Render

```bash
npm run render:promo   # -> out/promo.mp4   1080x1920 @30fps, 5s
npm run render:wide    # -> out/wide.mp4    1920x1080 @30fps, 6s
npm run render -- src/index.ts Promo out/custom.mp4 --props='{"title":"Halo"}'
```

Every render is H.264 / yuv420p / CRF 18, so it uploads straight to
TikTok, Reels, Shorts, YouTube.

## Layout

```
.devcontainer/             Dockerfile + devcontainer.json (node22, ffmpeg, opencode)
.github/workflows/         manual "render" workflow (Actions artifact)
docs/CODESPACE.md          step-by-step Codespaces guide (Indonesian)
src/
  index.ts                 entry (registerRoot)
  Root.tsx                 composition registry (id, size, fps, duration)
  props.ts                 default props shared by compositions
  compositions/
    Promo.tsx              vertical 1080x1920
    Wide.tsx               landscape 1920x1080
remotion.config.ts         codec / image format / crf
tools/ffmpeg-helpers.sh    post-processing helpers
```

## Add a new video

1. Create `src/compositions/MyVideo.tsx` (a React component, `React.FC<Props>`).
2. Register it in `src/Root.tsx` with `id`, `width`, `height`, `fps`, `durationInFrames`.
3. Render: `npx remotion render src/index.ts MyVideo out/my-video.mp4`.

## Post-process

```bash
source tools/ffmpeg-helpers.sh
vcompress out/promo.mp4 out/promo-small.mp4
vgif out/promo.mp4 out/promo.gif
vcover out/promo.mp4 out/cover.jpg 1.5
vthumb out/promo.mp4 out/thumbs
```
