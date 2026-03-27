self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// --- الجزء الجديد لاستقبال أمر التنبيه كل دقيقة ---
self.addEventListener('message', (event) => {
    if (event.data.type === 'SHOW_TEST_NOTIFY') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: 'https://athkarapp.com/images/athkarLogo.png',
            badge: 'https://athkarapp.com/images/athkarLogo.png',
            tag: 'test-notification'
        });
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow('/'));
});
