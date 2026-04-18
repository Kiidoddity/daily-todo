// Cache version — update this string whenever you push new files.
// Using a timestamp means it auto-increments on every SW deployment.
const CACHE_NAME = ‘daily-todo-’ + ‘2026-04-18-v2’;

const STATIC_ASSETS = [
‘./index.html’,
‘./manifest.json’,
‘./icon-192.png’,
‘./icon-512.png’
];

// INSTALL — cache all static assets fresh
self.addEventListener(‘install’, event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(STATIC_ASSETS))
.then(() => self.skipWaiting())  // activate immediately, don’t wait for old SW to die
);
});

// ACTIVATE — delete every old cache that isn’t this version
self.addEventListener(‘activate’, event => {
event.waitUntil(
caches.keys()
.then(keys => Promise.all(
keys
.filter(k => k !== CACHE_NAME)
.map(k => {
console.log(’[SW] Deleting old cache:’, k);
return caches.delete(k);
})
))
.then(() => self.clients.claim())  // take control of all open pages immediately
);
});

// FETCH — network first, fall back to cache
// This means users always get the latest version when online,
// and the cached version when offline.
self.addEventListener(‘fetch’, event => {
if (event.request.method !== ‘GET’) return;

// Don’t cache Google Fonts requests — let the browser handle those
if (event.request.url.includes(‘fonts.googleapis.com’) ||
event.request.url.includes(‘fonts.gstatic.com’)) {
return;
}

event.respondWith(
fetch(event.request)
.then(response => {
// Only cache successful responses
if (response && response.status === 200) {
const clone = response.clone();
caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
}
return response;
})
.catch(() => {
// Network failed — serve from cache
return caches.match(event.request);
})
);
});

// MESSAGE — allow the page to force a cache clear and reload
self.addEventListener(‘message’, event => {
if (event.data === ‘SKIP_WAITING’) {
self.skipWaiting();
}
});
