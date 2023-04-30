/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "a1f77637a9e42568c36df31634c387a4"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "50013fd1cb0bdaa2ac976feb871979f3"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "53f6f335cfcd6df03392421d0e182073"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "24b12bef1e6bdb9807b2cc59a945d8d2"
  },
  {
    "url": "assets/css/0.styles.185cf5f0.css",
    "revision": "76573b88f87aba5e396f46028189a24a"
  },
  {
    "url": "assets/img/1653118922924.72d846fb.png",
    "revision": "72d846fb69746976a4d772fb9e591d71"
  },
  {
    "url": "assets/img/1653119053628.69b5bb13.png",
    "revision": "69b5bb133d2236a6f2c6c21ddda32313"
  },
  {
    "url": "assets/img/home-bg.7b267d7c.jpg",
    "revision": "7b267d7ce30257a197aeeb29f365065b"
  },
  {
    "url": "assets/img/iconfont.36767f3e.svg",
    "revision": "36767f3efa2e4c880f42a42e8b2075b0"
  },
  {
    "url": "assets/js/1.f9445522.js",
    "revision": "ffb7b3522ff7156d327ccd1d0eb7f4e1"
  },
  {
    "url": "assets/js/10.7e9f8a75.js",
    "revision": "c244146f0cee0728e8eede93bb67d5fc"
  },
  {
    "url": "assets/js/11.e7365fbf.js",
    "revision": "f207c19fc22b54daa6811f8e4011e472"
  },
  {
    "url": "assets/js/12.b451c679.js",
    "revision": "60c4064379f2840628d1cfc0411327bc"
  },
  {
    "url": "assets/js/13.5331c00e.js",
    "revision": "7d2252f549fb7f4c23bff6cbcbaa69db"
  },
  {
    "url": "assets/js/14.ebd191e6.js",
    "revision": "350bdd066e3fe43872fd592825192985"
  },
  {
    "url": "assets/js/15.25e1c4d1.js",
    "revision": "5cb49c884b660c7fe975b1d57b58820c"
  },
  {
    "url": "assets/js/16.524c169a.js",
    "revision": "972bf1dd8e77492b428b43c36f684bb2"
  },
  {
    "url": "assets/js/17.179982f8.js",
    "revision": "1c2ed1849baf75ecdad17535372f2fa6"
  },
  {
    "url": "assets/js/18.5f608851.js",
    "revision": "269aba192355df77612c01866d3a3cd1"
  },
  {
    "url": "assets/js/19.92d37048.js",
    "revision": "35b46f6e12dc0795c5cd6df831571834"
  },
  {
    "url": "assets/js/20.ea557779.js",
    "revision": "9e302cdba0d3ed8f76af4c1bae1209a9"
  },
  {
    "url": "assets/js/4.c6d155d6.js",
    "revision": "63582b505de3fd0cfdd86d6b9207408b"
  },
  {
    "url": "assets/js/5.71c145d5.js",
    "revision": "a61b0b202a97c7a88f19b47e113e748d"
  },
  {
    "url": "assets/js/6.fac33249.js",
    "revision": "944f043202085790c03a54bec6cae8db"
  },
  {
    "url": "assets/js/7.528891f9.js",
    "revision": "ad25742290c1c07d32c25666172b8d57"
  },
  {
    "url": "assets/js/8.b87169f2.js",
    "revision": "034d67f0ac77fb9a657b9d99ca901bdd"
  },
  {
    "url": "assets/js/9.fd1c866e.js",
    "revision": "4247e258a44165e10104eb326e3c0c99"
  },
  {
    "url": "assets/js/app.7946cfbf.js",
    "revision": "9091d9f041754d53981939f2333cf01c"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.92740f13.js",
    "revision": "73b863921d49e9222a4278a3cad7f4da"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "1a5d3744af6c541bf5731ea70f066f3c"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "dc4301160a268410cbb30376468b4f71"
  },
  {
    "url": "categories/index.html",
    "revision": "8bc4fcacb63d01e231f407b4cb72256e"
  },
  {
    "url": "categories/java/index.html",
    "revision": "f52742755a49ab4e42f1a5a1c0214194"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "4d8f14c3d9d424754177c4c5e69c5fb5"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "1453cb1c2554d1947006f48d0af19b23"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "1bf8a27a5b4c93b30f60b14d7f25fdd7"
  },
  {
    "url": "css/style.css",
    "revision": "b9634487d96bc3287f8f3ed47f003830"
  },
  {
    "url": "hero_white.png",
    "revision": "5c707c6a6f8be5e1b6d767c83cedc8d5"
  },
  {
    "url": "img/1.jpg",
    "revision": "c48683b7627396b02eb4a7df386431f5"
  },
  {
    "url": "img/5.jpg",
    "revision": "e2fb94896692b7fa6078038550929c41"
  },
  {
    "url": "img/kbjw2.jpg",
    "revision": "78b0701cb66d42de9a6eaa6b0ff38ece"
  },
  {
    "url": "img/logo.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "index.html",
    "revision": "e396c2f211e7934f5ccbbfc2d0022902"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "df172c3ddde970592c85becc4b2000b2"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "01e481771b563598546073cb2ba41aa1"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "2a172164e812c1b71ff0d91a337bd045"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "b1f67b7fe05fb4807b53c7706e23cb18"
  },
  {
    "url": "tags/js/index.html",
    "revision": "9d514844c25e92a27818d66744bdc7fc"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "cdcf02b04814d2aa78874c937ef589ec"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "9e89b55d95b54f945aa113d4e5fd3525"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "a53cd94572240d010eb60679d1bc7554"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "bd623dcb3a2f6dccb7205088c7a27d5c"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "7cbc075f265ab8d43fffc726d34a442a"
  },
  {
    "url": "timeline/index.html",
    "revision": "835a024c23d1409171da8c6dc6b1d2df"
  },
  {
    "url": "学有所思/life.html",
    "revision": "b4a1c9ec9e59629aab282e76e9009c16"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "3031c7e5fe82122c49d9c683261df7f5"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "3a8d0866aa39b7a8019c9a7c415c362f"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "60abfaf6871d74ac62396413b1af13a9"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "96a9aebdf792a3a075d99b094478ed64"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
