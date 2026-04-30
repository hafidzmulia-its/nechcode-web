// Legacy service worker cleanup.
// Older builds registered /sw.js; keep this file so browsers can replace and remove it.
async function clearOldAppCaches() {
  if (!self.caches) {
    return;
  }

  const keys = await self.caches.keys();
  await Promise.all(keys.map((key) => self.caches.delete(key)));
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clearOldAppCaches()
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin && url.pathname.startsWith("/_next/")) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
  }
});
