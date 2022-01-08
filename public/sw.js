console.log("Resource added.");

var APP_PREFIX = "gpt3_"; // Identifier for this app (this needs to be consistent across every cache update)
var VERSION = "v_01"; // Version of the off-line cache (change this value everytime you want to update cache)
var CACHE_NAME = APP_PREFIX + VERSION;

var url_Cache = [
  "/",
  "/manifest.json",
  "/static/js/bundle.js",
  "/static/media",
  "/favicon.ico",
  "/images/icons/icon-192x192.png",
  "/site/",
  "/site/index.html",
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

//delete unused cache
// Delete outdated caches
self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      // `keyList` contains all cache names under your username.github.io
      // filter out ones that has this app prefix to create white list
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      // add current cache name to white list
      cacheWhitelist.push(CACHE_NAME);

      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log("deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
