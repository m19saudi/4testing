self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// استقبال أمر التنبيه من الصفحة وإظهاره فوراً
self.addEventListener('message', (event) => {
    if (event.data.type === 'SHOW_TEST_NOTIFY') {
        self.registration.showNotification(event.data.title, {
            body: event.data.body,
            icon: 'https://athkarapp.com/images/athkarLogo.png',
            badge: 'https://athkarapp.com/images/athkarLogo.png',
            // جعلنا الـ tag متغيراً بناءً على الوقت الحالي 
            // لكي يظهر كل إشعار بشكل مستقل ويصدر صوتاً جديداً
            tag: 'notify-' + Date.now() 
        });
    }
});

// فتح التطبيق عند الضغط على الإشعار
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then(windowClients => {
            // إذا كان التطبيق مفتوحاً أصلاً، نركز عليه، وإلا نفتح نافذة جديدة
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === '/' && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
