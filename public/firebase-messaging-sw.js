// Placeholder service worker to avoid 404 while Firebase Cloud Messaging is not initialized.
// Keep this worker cache-safe: stale cached Next.js chunks can break Turbopack/HMR.
const CHUNK_PATH_PREFIX = "/_next/";

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
    clearOldAppCaches().then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.origin === self.location.origin && url.pathname.startsWith(CHUNK_PATH_PREFIX)) {
    event.respondWith(fetch(event.request, { cache: "no-store" }));
  }
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "CLEAR_APP_CACHES") {
    event.waitUntil(clearOldAppCaches());
  }
});
