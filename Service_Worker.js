;
//asignar un nombre y versión al cache
const CACHE_NAME = 'Web',
  urlsToCache = [
    './',
    './index.html',
    './index_2.html',
    './contact.html',
    './cart.html',
    './about.html',
    './404.html',
    './news.html',
    './shop.html',
    './single-news.html',
    './single-product.html',
    
    './assets/bootstrap/css/bootstrap-grid.css',
    './assets/bootstrap/css/bootstrap-grid.css.map',
    './assets/bootstrap/css/bootstrap-grid.min.css',
    './assets/bootstrap/css/bootstrap-grid.min.css.map',
    './assets/bootstrap/css/bootstrap-reboot.css',
    './assets/bootstrap/css/bootstrap-reboot.css.map',
    './assets/bootstrap/css/bootstrap-reboot.min.css',
    './assets/bootstrap/css/bootstrap-reboot.min.css.map',
    './assets/bootstrap/css/bootstrap.css',
    './assets/bootstrap/css/bootstrap.css.map',
    './assets/bootstrap/css/bootstrap.min.css',
    './assets/bootstrap/css/bootstrap.min.css.map',
    
    './assets/bootstrap/js/bootstrap.bundle.js',
    './assets/bootstrap/js/bootstrap.bundle.js.map',
    './assets/bootstrap/js/bootstrap.bundle.min.js',
    './assets/bootstrap/js/bootstrap.bundle.min.js.map',
    './assets/bootstrap/js/bootstrap.js',
    './assets/bootstrap/js/bootstrap.js.map',
    './assets/bootstrap/js/bootstrap.min.js',
    './assets/bootstrap/js/bootstrap.min.js.map',

    './assets/css/responsive.css',
    './assets/css/main.css',
    //imagenes
    './assets/img/logo.png',
    './assets/img/favicon.png',
    './assets/img/products/product-img-1.jpg',
    './assets/img/products/product-img-2.jpg',
    './assets/img/products/product-img-3.jpg',
    './assets/img/products/product-img-4.jpg',
    './assets/img/products/product-img-5.jpg',
    './assets/img/products/product-img-6.jpg',

    './assets/img/company-logos/1.png',
    './assets/img/company-logos/2.png',
    './assets/img/company-logos/3.png',

    //js
    './assets/js/jquery-1.11.3.min.js',
    './assets/js/main.js',
    './assets/js/app.js',

    //fonts
    './assets/webfonts/fa-brands-400.ttf',
    './assets/webfonts/fa-regular-400.ttf',
    './assets/webfonts/fa-solid-900.ttf',

    './registro_SW.js',

    './images/icono/icon-512x512.png',




  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})