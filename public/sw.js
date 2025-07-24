const CACHE_NAME = "v1";

const addResourcesToCache = async (resources) => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(resources);
    // cache.keys().then(result=>{
    //   result.map(res=>{
    //     console.log(res.url)})})
};

// install service worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        addResourcesToCache([
            "/",
            "/index.html",
            "/index.css",
            "/app.js",
            "/offline.html",
            "/images/fallback.png"
        ])
    );
});

// activate service worker
self.addEventListener("activate", (event) => {

    console.info("activate sw....");

    event.waitUntil(
        caches.keys().then((names) =>
            Promise.all(
                names
                    .filter((name) => name !== CACHE_NAME)
                    .map((name) => caches.delete(name))
            )
        )
    );

});

// fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            // 1) Serve from cache if available
            if (cachedResponse) {
                return cachedResponse;
            }

            // 2) Try to fetch from network
            return fetch(event.request).catch(() => {
                // 3) If offline and request is a navigation (HTML page)
                if (event.request.mode === "navigate") {
                    return caches.match("/offline.html");
                }

                // 4) If request is an image (you can add more types)
                if (event.request.destination === "image") {
                    return caches.match("/images/offline.png");
                }
            });
        })
    );
});


