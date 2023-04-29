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
    "revision": "6aa3643a81587d471d66ba7ac071587a"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "382296c07bacbf3681a320fdccb6d63e"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "c7f5f6a58b7589f26bde18b569029609"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "920725b4b19e679c24fae499ad13a589"
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
    "url": "assets/js/1.42d63d7e.js",
    "revision": "dd968479593012df5068e5f3a476fc89"
  },
  {
    "url": "assets/js/10.010652fd.js",
    "revision": "1190a90f59ad523e892053ac74cf6b1a"
  },
  {
    "url": "assets/js/11.28e099ed.js",
    "revision": "38090136f893e1f4d783cf17db4df70e"
  },
  {
    "url": "assets/js/12.a02ad068.js",
    "revision": "a70681956a67e921ef86aae07cb5cf59"
  },
  {
    "url": "assets/js/13.8fba2831.js",
    "revision": "bd9abefee10b471ade5eeba642504721"
  },
  {
    "url": "assets/js/14.b56fead5.js",
    "revision": "ad57f1c7d4d3aa6e6302afa45b22ef29"
  },
  {
    "url": "assets/js/15.6e73fc4b.js",
    "revision": "db3efa8166f500cd08941fba260a08ea"
  },
  {
    "url": "assets/js/16.bc054b36.js",
    "revision": "ca902310944faa292d787d22ba7a5034"
  },
  {
    "url": "assets/js/17.c1195bd5.js",
    "revision": "c44e8c37dc89ef1bc0946f91f236585d"
  },
  {
    "url": "assets/js/18.1a3860ec.js",
    "revision": "8b181f932ab855134dc59f19b4440601"
  },
  {
    "url": "assets/js/19.38eb7bb6.js",
    "revision": "56f44fdf82e7298cb58eb5e857bbd17c"
  },
  {
    "url": "assets/js/20.70c3eb69.js",
    "revision": "35cfe5590de9477a737ad237f30d9569"
  },
  {
    "url": "assets/js/4.28a836cd.js",
    "revision": "52d653b5ac6a4353d37c1f2a7b8e0459"
  },
  {
    "url": "assets/js/5.22763e75.js",
    "revision": "00e72fe19fdc11275805f5783ba9b928"
  },
  {
    "url": "assets/js/6.f4545631.js",
    "revision": "98f0f6c0977a198afcff8d50f9d553d0"
  },
  {
    "url": "assets/js/7.a7f75c66.js",
    "revision": "4219bfef5d4a80c1cdb0616176453d4c"
  },
  {
    "url": "assets/js/8.2f1ad406.js",
    "revision": "84872ca42db6138ed425a65c5f2f1b56"
  },
  {
    "url": "assets/js/9.f6b8b094.js",
    "revision": "4fda23191f4c3353b5372815c040d90a"
  },
  {
    "url": "assets/js/app.e5c5b772.js",
    "revision": "5210cdc54169c05576d536f5ed267068"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.6ecfa24c.js",
    "revision": "0914943e5101085e2068a7393195effe"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "11e504223e23aee645cad21a95e78556"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "a1ccd7ab0253ee0d2bb9893b70ebac72"
  },
  {
    "url": "categories/index.html",
    "revision": "867801ed21cfa338ad7f9a8635cbc8a1"
  },
  {
    "url": "categories/java/index.html",
    "revision": "90625e3d2a61c8443459e3f4e8e19e7a"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "1b3089bb909706f0086c4e32ff5c51fd"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "fb750b7e1a3fd62c53ce06ef4c1fdda1"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "241b3907f95f17ac924cff0eeb2cbaa3"
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
    "revision": "da0471acceb7b136556abab2f09cf1e5"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "af7e5d977a422f8b9c301e131e88ec90"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "7bc58492bd89366566cdf69e1fa5aeae"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "94af86f33778adf0fb84555afceecde7"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "1b44ba183fb1d4dc0ccc1c8c600947af"
  },
  {
    "url": "tags/js/index.html",
    "revision": "b08b4b8f9599e3015961a7f7b91431ff"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "954d7315a3404e3b4cd617bb66054721"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "e7664f98088b6fe301c38cd954648ab0"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "5f2e6ecca07e9a469a8d2f5e6fa992de"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "5b28943c2b5f8a4437f4835c25ec8c4a"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "2c2ba1c30551f9c81bba15c795cbfe98"
  },
  {
    "url": "timeline/index.html",
    "revision": "102de3c0211875522e1a3f689b036414"
  },
  {
    "url": "学有所思/life.html",
    "revision": "12894bfb6a2e98efaa1e4b0c5bd4c338"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "b982583d9049c97e6565c591505900ef"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "ade8ba933a8b2aec352b8a126576a8e5"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "60374c7023c08565ed45f64f84b442a2"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "b7b577cff6c6dbd9b568ba60f5ecd329"
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
