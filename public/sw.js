const CACHE_VERSION = "validtrack-1.0.0-4";
const CACHE_NAME = `validtrack-static-${CACHE_VERSION}`;

const PRECACHE_URLS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pwa.css",
  "/favicon.png",
  "/icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/avatar.png",
  "/screenshots/mobile.png",
  "/screenshots/wide.png",
  "/fonts/MaterialCommunityIcons.ttf",
  "/fonts/PlusJakartaSans_400Regular.ttf",
  "/fonts/PlusJakartaSans_500Medium.ttf",
  "/fonts/PlusJakartaSans_600SemiBold.ttf",
  "/fonts/PlusJakartaSans_700Bold.ttf",
  "/fonts/PlusJakartaSans_800ExtraBold.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.allSettled(
        PRECACHE_URLS.map(async (url) => {
          try {
            await cache.add(url);
          } catch (error) {
            console.warn("Precache skipped:", url, error);
          }
        })
      );
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter(
            (key) => key.startsWith("validtrack-static-") && key !== CACHE_NAME
          )
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html"))
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkPromise = fetch(event.request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return response;
      });

      return cachedResponse || networkPromise;
    })
  );
});
