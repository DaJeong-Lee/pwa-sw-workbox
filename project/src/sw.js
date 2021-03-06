importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([]);

  workbox.precaching.precache([
    {
      url: '/index.html',
      revision: 'abcd',
    }
  ]);

//	workbox.routing.registerRoute(
//		/(.*)index.html/,
//		workbox.strategies.staleWhileRevalidate({
//			cacheName: 'index-cache',
//			plugins: [
//				new workbox.expiration.Plugin({
//					maxEntries: 50,
//					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
//				})
//			]
//		})
//	);

  workbox.routing.registerRoute(
		/(.*)articles(.*)\.(?:png|gif|jpg)/,
		workbox.strategies.networkFirst({
			cacheName: 'images-cache',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 50,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				})
			]
		})
	);

	workbox.routing.registerRoute(
		/(.*)icon(.*)\.(?:png|gif|jpg|svg)/,
		workbox.strategies.staleWhileRevalidate({
			cacheName: 'icon-cache',
			plugins: [
				new workbox.expiration.Plugin({
					maxEntries: 5,
					maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
				})
			]
		})
	);

	const articleHandler = workbox.strategies.networkFirst({
		cacheName: 'articles-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 50,
			})
		]
	});

	workbox.routing.registerRoute(/(.*)article(.*)\.html/, args => {
		return articleHandler.handle(args).then(response => {
			if (!response) {
				return caches.match('pages/offline.html');
			} else if (response.status === 404) {
				return caches.match('pages/404.html');
			}
			return response;
		});
	});

	const postHandler = workbox.strategies.networkFirst({
		cacheName: 'post-cache',
		plugins: [
			new workbox.expiration.Plugin({
				maxEntries: 50,
			})
		]
	});

	workbox.routing.registerRoute(/(.*)post(.*)\.html/, args => {
		return postHandler.handle(args).then(response => {
			if (!response) {
				return caches.match('pages/offline.html');
			} else if (response.status === 404) {
				return caches.match('pages/404.html');
			}
			return response;
		});
	});


} else {
  console.log(`Boo! Workbox didn't load 😬`);
}