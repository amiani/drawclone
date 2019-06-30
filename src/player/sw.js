var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/src/player/player-app.js',
  '/src/player/player-lobby.js',
  '/src/player/player-drawing.js',
  '/src/player/player-titling.js',
  '/src/player/player-picking.js',
  '/src/player/player-endlobby.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});