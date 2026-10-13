/**
 * Spotter Hand-Written Service Worker
 * Rules: .agent/rules/phone-and-cache.md
 * - Caches app shell (HTML shell, CSS tokens, fonts).
 * - NEVER caches private API routes (/api/member, /api/auth, /api/staff, /api/owner).
 * - Versioned cache name with old cache cleanup on activate.
 */

const CACHE_NAME = 'spotter-shell-v1';
const SHELL_ASSETS = [
  '/',
  '/manifest.webmanifest',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(SHELL_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // CRITICAL RULE: NEVER cache private API endpoints or auth calls
  if (
    url.pathname.startsWith('/api/member') ||
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/api/staff') ||
    url.pathname.startsWith('/api/owner')
  ) {
    return; // Pass through straight to network
  }

  // Non-GET requests pass through
  if (event.request.method !== 'GET') {
    return;
  }

  // Network-first with cache fallback for shell navigation
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        // Cache successful static chunk responses
        if (
          networkResponse.status === 200 &&
          (url.pathname.startsWith('/_next/static') || url.pathname.endsWith('.css'))
        ) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          if (event.request.mode === 'navigate') {
            return caches.match('/');
          }
          return new Response('Network unavailable offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' },
          });
        });
      })
  );
});
