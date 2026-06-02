const CACHE_NAME = 'shopping-hm-v2';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './words.json',
  './assets/images/market_scene.png',
  './assets/images/store_map.png',
  './assets/images/basket_receipt.png',
  './assets/audio/clip_rice.mp3',
  './assets/audio/clip_basket.mp3',
  './assets/audio/clip_water.mp3',
  './assets/audio/clip_rice.wav',
  './assets/audio/clip_basket.wav',
  './assets/audio/clip_water.wav',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin || event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
