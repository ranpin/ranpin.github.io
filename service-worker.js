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
    "revision": "455daeb13e14a350645bed59c40ea1e4"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "6534f3cbb93213bdece40cf6512f60c6"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "d4d2461ab149328e089f73c468fc42d9"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "d48d70388adddbbd61ead64b772ac776"
  },
  {
    "url": "assets/css/0.styles.57064493.css",
    "revision": "bdfc107ffa09860922a6644b10cc5fcd"
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
    "url": "assets/js/1.73dc42e5.js",
    "revision": "30e828c146c3447f6cbf728cdd82e925"
  },
  {
    "url": "assets/js/10.755aaf89.js",
    "revision": "575fd256d999c8924a81570865492039"
  },
  {
    "url": "assets/js/11.7784d75f.js",
    "revision": "d37a671f32cb2828a09d323db51bb73a"
  },
  {
    "url": "assets/js/12.765d23e8.js",
    "revision": "1523ab2e9237d015413223374b0b45be"
  },
  {
    "url": "assets/js/13.f5756029.js",
    "revision": "21c4609b8ee8a287f9ba700e6bea2daf"
  },
  {
    "url": "assets/js/14.872a288c.js",
    "revision": "b361578ebed338feebff122ba79050a0"
  },
  {
    "url": "assets/js/15.1a53989b.js",
    "revision": "def76daa4b93f21d04c7c797f7d7853a"
  },
  {
    "url": "assets/js/16.524c169a.js",
    "revision": "972bf1dd8e77492b428b43c36f684bb2"
  },
  {
    "url": "assets/js/17.7681db69.js",
    "revision": "163ab83038f2b0341bc7fe08450e8785"
  },
  {
    "url": "assets/js/18.e4d45960.js",
    "revision": "d582b41d2126f1249372c94e8374c7ce"
  },
  {
    "url": "assets/js/19.d4fefe54.js",
    "revision": "763b39bcc20cedcbf7be543242a4ea2d"
  },
  {
    "url": "assets/js/20.200e2808.js",
    "revision": "40d1cb60a51107274d9c1a5f22bb11aa"
  },
  {
    "url": "assets/js/21.cf676efe.js",
    "revision": "9e88d5ad77b342d8f1f055eb53205c79"
  },
  {
    "url": "assets/js/4.530f9966.js",
    "revision": "b214ce02fd8b308e7ea1c3ad69ddc171"
  },
  {
    "url": "assets/js/5.c5040fed.js",
    "revision": "e2bc4eaa9622beb380eea4338dee76db"
  },
  {
    "url": "assets/js/6.5fcab6fb.js",
    "revision": "9c53f478a4e80a146d98baf5ee8b3535"
  },
  {
    "url": "assets/js/7.b593c412.js",
    "revision": "0dde116745716530814e84d60ab40852"
  },
  {
    "url": "assets/js/8.35ed554a.js",
    "revision": "8c3caf7b56a9837f6b71ce38b9209d7a"
  },
  {
    "url": "assets/js/9.d70f1ec7.js",
    "revision": "2399b4d91b4842b66b4b6249f0aa2496"
  },
  {
    "url": "assets/js/app.57ba26f5.js",
    "revision": "0432647db5567c41c63f3f4614ee3e43"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.3be7e059.js",
    "revision": "24b9b10d01887df7cd99e8fc8e27d06d"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/index.html",
    "revision": "706fe2d5c6ab5e7532fb768a907e8363"
  },
  {
    "url": "categories/java/index.html",
    "revision": "7f75ba487196557862b44105b672a406"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "de201ee8973c1ff320b46c5a97b70581"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "92d435933dcd95f3585e8f2530dc3a5d"
  },
  {
    "url": "css/style.css",
    "revision": "b2d91d2608e5d55a27e4cd32683fc580"
  },
  {
    "url": "hero_white.png",
    "revision": "5c707c6a6f8be5e1b6d767c83cedc8d5"
  },
  {
    "url": "img/5.jpg",
    "revision": "c48683b7627396b02eb4a7df386431f5"
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
    "revision": "8d7989ca45993ea521deed7426805d54"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "eab3e9a660d63611c04ea2379c9e46d6"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "58c96d8f55650b2351fd5ee5add7a8de"
  },
  {
    "url": "tags/js/index.html",
    "revision": "967b1feb98402035a1f3405e90ec7817"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "df120b806c162482b89b062d2f1bf409"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "c2bef99e9688770a1c26ca21d50e02e9"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "ddbd1040c0555d5a43660fbe82948dc6"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "969c43074eb9706143d6c3ff6b0b24a6"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "57b2e0b0b457e9f5fc6f979e5b6ea3f9"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "2e53e9dc28525c3d2df413630495fac5"
  },
  {
    "url": "timeline/index.html",
    "revision": "e2587243dbe36b474b22c8b78df7b057"
  },
  {
    "url": "学有所思/life.html",
    "revision": "595129c61985a54680e654675721933a"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "33ef2cf8b9e3fa7dc567fd9ef19083bc"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "730addf38b5ccc729e9abd827024ab30"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "6de06b9ff15ca9278ca2b039c2a1b485"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "d99be3c025b91297afd5191e04df7a4b"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "469b5e9711a4f57b973365f0162b2895"
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
