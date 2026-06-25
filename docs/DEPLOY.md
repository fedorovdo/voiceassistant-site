# Deploy VoiceAssistant Site

This is the deployment guide for the standalone `voiceassistant-site` project.

## Cloudflare Pages settings

- Project name: `voiceassistant-site`
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`
- Environment variables: none

## Migration order

1. Push `voiceassistant-site` to a new GitHub repository.
2. Create a separate Cloudflare Pages project named `voiceassistant-site`.
3. Configure:
   - build command: `npm run build`
   - output directory: `dist`
   - production branch: `main`
4. Verify the generated Pages URL, for example `https://voiceassistant-site.pages.dev/`.
5. Detach `voiceassistant.simplyadmin.org` from `simplyadmin-site` if it is attached there.
6. Attach `voiceassistant.simplyadmin.org` to the new `voiceassistant-site` Pages project.
7. Verify DNS and HTTPS for `https://voiceassistant.simplyadmin.org/`.
8. Keep `simplyadmin.org` and `www.simplyadmin.org` attached only to `simplyadmin-site`.

Important: the custom domain `voiceassistant.simplyadmin.org` must not be attached to both Pages projects simultaneously.

## GitHub repository creation commands

Run from `C:\dev\projects\voiceassistant-site` after creating the empty GitHub repository:

```powershell
git init
git add .
git commit -m "Initial VoiceAssistant landing site"
git branch -M main
git remote add origin https://github.com/fedorovdo/voiceassistant-site.git
git push -u origin main
```

Do not create tags or deploy automatically from this local preparation step.

## Reverse proxy fallback

If the site is ever hosted outside Cloudflare Pages, serve `dist/` as static files and fall back unknown routes to `index.html`:

```nginx
server {
  server_name voiceassistant.simplyadmin.org;
  root /var/www/voiceassistant-site/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```
