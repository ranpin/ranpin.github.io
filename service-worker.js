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
    "revision": "46fec1f471b148d5a6737457f1324eb9"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "ad6e727721b1279cfc81593ede2fe2fc"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "7d0dec06c6ae8b528593641b5a6a5832"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "b8cfc90423d1e081c02a4357e0ea3945"
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
    "url": "assets/js/app.92aea357.js",
    "revision": "043a0aa9777130e5291bc83268134150"
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
    "revision": "15b90c2590fa2c78270a860214bdc300"
  },
  {
    "url": "categories/java/index.html",
    "revision": "9f9acc646a39328ae10e0e8754f2707a"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "938ec4e8d96f38f987b428e513c8411e"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "169ab066c9be040ed194e526d359cf26"
  },
  {
    "url": "css/style.css",
    "revision": "f7f20b54ed2c03173324eac8e555c542"
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
    "revision": "7a611c35cd0b9899033a18f4b1cf49cb"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "68c20942b4e10f5ca2390352dadeac83"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "0fb3e6911a79cebb500fc3d0f42dad4e"
  },
  {
    "url": "tags/js/index.html",
    "revision": "f297fda1d8c1472f6abb1985210f0500"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "1579552a10e10cedd2b1935065444217"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "2aaac5a6aa4446dc5213c9244df223df"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "a7b47e62ba96059d11b85d49526db093"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "8fc7a592a912f0da0c510cbb7ec32357"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "f2f846c728c4970daaea9b49e24b0f2d"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "5b380ad8be352251eec13b394e318fc5"
  },
  {
    "url": "timeline/index.html",
    "revision": "57f0db37f6115dbe595190e10b79958a"
  },
  {
    "url": "学有所思/life.html",
    "revision": "b636a56bb61d77c366d2591bf16a9333"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "2d63775eb2e7810bb3560fd5326ee93a"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "8ecabeab9a081a12e3a39cbfb7a7f7f1"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "d7d2d494259770c34b27bdcdded3cc03"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "24f0d844b93d6fdce06a5f7933384236"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "7c1d951541639fbbbf3c73b00f29e634"
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
