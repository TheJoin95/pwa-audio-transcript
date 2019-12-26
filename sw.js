addEventListener('install', () => {
  skipWaiting();
});

addEventListener('activate', () => {
  clients.claim();
});

addEventListener('fetch', (event) => {
  if (event.request.method !== 'POST') return;
  
  event.respondWith(Response.redirect('/pwa-audio-transcript/'));
  
  event.waitUntil(async function () {
    const data = await event.request.formData();
    console.re.log(event);
    const client = await self.clients.get(event.resultingClientId);
    console.re.log(client);
    const file = data.get('file');
    client.postMessage({ file });
  }());
});
