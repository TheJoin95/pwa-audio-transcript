addEventListener('install', () => {
  skipWaiting();
});

addEventListener('activate', () => {
  clients.claim();
});

addEventListener('fetch', (event) => {
  if (event.request.method !== 'POST' || event.request.url.match(/auphonic/) !== null) return;
  
  try {
    event.respondWith(Response.redirect('/pwa-audio-transcript/'));
    
    event.waitUntil(async function () {
      const data = await event.request.formData();
      const client = await self.clients.get(event.resultingClientId);
      const file = data.get('file');
      client.postMessage({ file });
    }());
  } catch (e) {
    console.log(e);
  }
});
