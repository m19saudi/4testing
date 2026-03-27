self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// هذا الجزء يستقبل أمر إظهار التنبيه
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/') // يفتح التطبيق عند الضغط على التنبيه
    );
});
