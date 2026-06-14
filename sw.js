// v6 - force clear all caches
const CACHE = 'koushik-fifa-v6';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => {
        console.log('[SW] Deleting cache:', k);
        return caches.delete(k);
      }))
    )
  );
  self.clients.claim();
});

// Network first for everything - no caching
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request).catch(() => new Response('Offline'))
  );
});
