const CACHE_NAME = 'v1';
const CACHE_LIST = [
];

self.addEventListener('message', function(e){
	if(e.data == 'update'){
		self.skipWaiting();
	}
});

self.addEventListener('install', function(e){
	e.waitUntil(caches.open(CACHE_NAME).then(function(cache){
		cache.addAll(CACHE_LIST).then(function(e){
		})
	}))
});

self.addEventListener('activate', function(e){
	e.waitUntil(caches.keys().then(function(keys){
		keys.map(function(key){
			if(key != CACHE_NAME){
				caches.delete(key);
			}
		})
	}));
});

self.addEventListener('fetch', function(e){
	if(e.request.method == 'GET' && e.request.url.match(/\.css|\.js|\.jpg|\.jpeg|\.png|\.svg|\.ico|\.woff2|\.html$/)){
		e.respondWith(caches.match(e.request).then(function(res){
			if(res){
				return res;
			}
			return fetch(e.request).then(function(res){
				if(res.status == 200){
					let response = res.clone();
					caches.open(CACHE_NAME).then(function(cache){
						cache.put(e.request, response)
					});
				}
				return res;
			})
		}))
	}
});