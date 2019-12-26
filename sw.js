addEventListener('install', () => {
  skipWaiting();
});

addEventListener('activate', () => {
  clients.claim();
});

addEventListener('fetch', (event) => {
  if (event.request.method !== 'POST') return;
  
  event.respondWith(Response.redirect('./'));
  
  event.waitUntil(async function () {
    const data = await event.request.formData();
    const client = await self.clients.get(event.resultingClientId);
    const file = data.get('file');
    client.postMessage({ file });
  }());
});