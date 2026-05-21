# Vila Nomad landing page

Static informational landing page for Vila Nomad Brasov.

## Open locally

Open `index.html` directly in a browser, or serve the folder with any static server:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## WhatsApp CTA

All WhatsApp buttons use this destination:

```text
https://wa.me/40722292023
```

That is the correct WhatsApp format for `+40 722 292 023`: country code + number, without `+`, spaces, or punctuation.

## Fast cheap deployment

### Option 1: Netlify Drop, fastest client preview

1. Open `https://app.netlify.com/drop`.
2. Drag the entire `vila-nomad-landing-page` folder into the drop area.
3. Netlify gives you a public preview URL immediately.
4. Rename the generated site URL from Site settings if needed.

This is the fastest option and usually enough to show a client.

### Option 2: Vercel, simple and still free for preview

1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Go to `https://vercel.com/new` and import the repository.
4. Use default settings. No build command is needed.
5. Set output/static directory to the repository root if Vercel asks.

### Option 3: GitHub Pages, free but a bit slower

1. Create a GitHub repository.
2. Upload the contents of this folder.
3. Go to repository Settings -> Pages.
4. Source: deploy from branch.
5. Branch: `main`, folder: `/root`.
6. Wait for the generated `github.io` URL.

## Contents

- `index.html` - one-page informational site with WhatsApp CTA only
- `styles.css` - responsive styling inspired by the provided travel template
- `script.js` - gallery rendering and lightbox behavior
- `assets/photos/` - 59 downloaded gallery photos
- `assets/source/photo-downloads.txt` - source URL to local filename mapping
- `assets/source/sources.md` - source notes used for page content
