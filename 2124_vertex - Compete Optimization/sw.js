// sw.js - Service Worker File

const CACHE_NAME = 'my-site-cache-v1';
const ASSETS_TO_CACHE = [
    '/index.html',
    '/magnific-popups.css',
    '/tooplate-vertex.css',
    '/js/plugins.js',
    'img/vertex-bg-01.jpg',
    'img/vertex-bg-02.jpg',
    'img/vertex-bg-03.jpg',
    'img/vertex-bg-04.jpg'
  ];

// Install event - caches important files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch event - serves cached content when available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      })
  );
});
