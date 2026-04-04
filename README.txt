# Daily To-Do List — PWA Setup

A PWA (Progressive Web App) must be served over a local or live server to work —
you can't just double-click index.html like a normal file. Here's how to set it up.

---

## Option 1 — Quickest: Python local server (no installs needed)

1. Put this folder (`daily-todo-pwa`) somewhere permanent on your computer
2. Open Terminal (Mac/Linux) or Command Prompt (Windows)
3. Navigate to the folder:
   ```
   cd /path/to/daily-todo-pwa
   ```
4. Start the server:
   ```
   python3 -m http.server 8080
   ```
5. Open your browser and go to: **http://localhost:8080**

**To install on your phone (same Wi-Fi):**
- Find your computer's local IP (e.g. 192.168.1.5)
- Visit http://192.168.1.5:8080 on your phone
- iOS: tap Share → "Add to Home Screen"
- Android: tap the 3-dot menu → "Add to Home Screen" or "Install App"

---

## Option 2 — Free hosting with GitHub Pages (access from anywhere)

1. Create a free account at github.com
2. Create a new repository (name it `daily-todo`)
3. Upload all 5 files from this folder to the repo
4. Go to Settings → Pages → Source: "Deploy from branch: main"
5. Your app will be live at: **https://yourusername.github.io/daily-todo**
6. Visit that URL on any device and install it as a PWA

---

## Option 3 — Netlify Drop (easiest hosting, 2 minutes)

1. Go to **netlify.com/drop**
2. Drag the entire `daily-todo-pwa` folder onto the page
3. Netlify gives you a free public URL instantly
4. Visit the URL on your phone → install as PWA

---

## Files in this folder

| File | Purpose |
|------|---------|
| index.html | The app itself |
| manifest.json | PWA metadata (name, icon, colors) |
| sw.js | Service worker (offline support) |
| icon-192.png | App icon (Android / general) |
| icon-512.png | App icon (high-res) |

---

## Notes

- Your tasks are stored in the browser's localStorage on each device
- The app works fully offline once loaded (service worker caches everything)
- Clearing browser site data will erase your saved tasks
