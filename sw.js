// A simple Service Worker for PWA functionality.
const CACHE_NAME = 'bills-tracker-cache-v1';
const urlsToCache = [
    'index.html',
    'manifest.json',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'
];

// Install event: caches all necessary assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Failed to cache files:', error);
            })
    );
});

// Fetch event: serves cached content when offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response; // Return cached response
                }
                return fetch(event.request); // Fallback to network request
            })
    );
});

