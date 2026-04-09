const CACHE = 'person-description-practice-v3';
const ASSETS = ['./', './index.html', './words.json', './sw.js'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  event.respondWith(
    fetch(req).then((response) => {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(req, copy)).catch(() => null);
      return response;
    }).catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
  );
});
