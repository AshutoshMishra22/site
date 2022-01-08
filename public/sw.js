console.log("Resource added.");

let CACHE_NAME = "gpt3PWA";

var url_Cache = [
  "/",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/media",
  "/favicon.ico",
  "/images/icons/icon-192x192.png",
];

//install
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(url_Cache);
    })
  );
});

//Fetch
this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
              return (
                response ||
                fetch(event.request).then(function (response) {
                  cache.put(event.request, response.clone());
                  return response;
                })
              );
            });
          });
        })
        .catch((error) => console.log("Caching failed\n", error))
    );
  } else {
  }
});
