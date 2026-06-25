# VoiceAssistant Landing Page

Standalone public landing page for VoiceAssistant.

VoiceAssistant is a local Windows helper for technical discussions, learning, and quick practical explanations. This repository contains only the static public website. It does not contain the desktop application code.

## Architecture

Final public architecture:

- `voiceassistant.simplyadmin.org` -> this `voiceassistant-site` Cloudflare Pages project.
- `simplyadmin.org` -> separate `simplyadmin-site` Cloudflare Pages project.

The site root `/` renders the VoiceAssistant landing page directly. There is no hostname branching and no `/voiceassistant` route requirement.

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
git diff --check
```

## Build

```bash
npm run build
```

The static output is generated in `dist/`.

## Deployment

Deployment target: Cloudflare Pages.

Suggested settings:

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Environment variables: none

`public/_redirects` contains a SPA fallback for Cloudflare Pages.

## VoiceAssistant Release Links

- Repository: `https://github.com/fedorovdo/VoiceAssistant`
- Release: `https://github.com/fedorovdo/VoiceAssistant/releases/tag/v0.2.0`
- Windows download: `https://github.com/fedorovdo/VoiceAssistant/releases/download/v0.2.0/VoiceAssistant-0.2.0-x64.exe`
- SHA-256: `f35c482ea36f246f6785d79a33e5833f60492d548882ae4ce9271cb2fd3f014c`

## Screenshots

No real screenshot is committed yet. Add it at:

`public/images/voiceassistant-main.png`

Until then the page renders an explicit placeholder frame.

## Repository Preparation

This directory is intended to become a separate public repository. Do not commit `node_modules` or `dist` unless a future deployment workflow explicitly requires static output in Git.
