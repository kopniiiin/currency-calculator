const CACHE_NAME = `currency-calculator-cache`;

self.addEventListener(`install`, (evt) => evt.waitUntil(
  caches.open(CACHE_NAME)
    .then((cache) => cache.addAll([`/`, `/index.html`, `/bundle.css`, `/bundle.js`]))
));

const cacheResponse = (request, response) => {
  const responseCopy = response.clone();
  if (responseCopy.ok) caches.open(CACHE_NAME).then((cache) => cache.put(request, responseCopy));
  return response;
}

self.addEventListener(`fetch`, (evt) => {
  const {request} = evt;

  evt.respondWith(
    caches.match(request).then((cachedResponse) => (
      cachedResponse ? cachedResponse : fetch(request).then((response) => cacheResponse(request, response))
    ))
  );
});
