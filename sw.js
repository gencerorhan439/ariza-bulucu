const CACHE_NAME = 'ariza-bulucu-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// Kurulum aşaması: Dosyaları telefonun önbelleğine kaydet
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Dosyalar önbelleğe alındı');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Fetch (Ağ isteği) aşaması: İnternet yoksa önbellekten (cache) getir
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Önbellekte varsa onu döndür, yoksa internetten çekmeye çalış
        return response || fetch(event.request);
      })
  );
});