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
    "revision": "525732774da75727a1df110457679dce"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "56fc55c78eb1613969d42ac95314bdcb"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "49ba765a0ce1911b942afc2697c7a70f"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "a4bce96e091cb49c528e0b113b9c1fdc"
  },
  {
    "url": "assets/css/0.styles.185cf5f0.css",
    "revision": "76573b88f87aba5e396f46028189a24a"
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
    "url": "assets/js/10.26049f71.js",
    "revision": "962db3d1dc5931a55f9a54c628223c79"
  },
  {
    "url": "assets/js/11.d90d8bfb.js",
    "revision": "dceb4efc6b03967f66c1393076b92213"
  },
  {
    "url": "assets/js/12.5f4895dc.js",
    "revision": "3802f94e320289d4f9e19f756691a483"
  },
  {
    "url": "assets/js/13.0404c3d8.js",
    "revision": "9015f3263f9055425d656307f0032013"
  },
  {
    "url": "assets/js/14.3bc7e746.js",
    "revision": "97b105ee3f34ecf8e03d7fc08c6a5322"
  },
  {
    "url": "assets/js/15.db81e5e8.js",
    "revision": "9a207fd16e2b2514130d3c3a638c2bb9"
  },
  {
    "url": "assets/js/16.3746fd71.js",
    "revision": "38f08cebb4c05afe9d245e9042d395b9"
  },
  {
    "url": "assets/js/17.309d8f9d.js",
    "revision": "7d077de62a863d8c978a6f981208b18f"
  },
  {
    "url": "assets/js/18.5f608851.js",
    "revision": "269aba192355df77612c01866d3a3cd1"
  },
  {
    "url": "assets/js/19.7af3db92.js",
    "revision": "6bebf1b212ed2f86df6ecf8b20985c08"
  },
  {
    "url": "assets/js/20.ea557779.js",
    "revision": "9e302cdba0d3ed8f76af4c1bae1209a9"
  },
  {
    "url": "assets/js/4.e92d468e.js",
    "revision": "8c04e5a87ba291e0c9b41201d8533c38"
  },
  {
    "url": "assets/js/5.bee2cf70.js",
    "revision": "f41578ea10359dc246a704f5dd85661b"
  },
  {
    "url": "assets/js/6.d553eed5.js",
    "revision": "0dd9d21dda44966ea69e662e59731bfa"
  },
  {
    "url": "assets/js/7.bcddde1c.js",
    "revision": "51cf3986a3e1ac1b5b3a28077fd3899d"
  },
  {
    "url": "assets/js/8.7ed2c13e.js",
    "revision": "b663711f7866818f8ca3d7d62e3ec57c"
  },
  {
    "url": "assets/js/9.19f04698.js",
    "revision": "9c3c5b1d0c9bea74113c0a341bb5c158"
  },
  {
    "url": "assets/js/app.9b8a1292.js",
    "revision": "509a543f4f83e4a848b9b0d9458d554d"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.b2fa58ee.js",
    "revision": "b822e747772c07fb4ffebbfb5c7e0db6"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "874bb801afff34f699435c9afa31efbf"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "18bb9cb726e58175bfdcb537bd2f0934"
  },
  {
    "url": "categories/index.html",
    "revision": "b7a3c487e3670550bf10780e1d2bb25c"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "de2667fad9e16bcad9bb42c33186071e"
  },
  {
    "url": "categories/Python/index.html",
    "revision": "87e13901619a55389dc93007d4b3a0cc"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "e21077d131db3ce73ba78ede54e089b9"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "632b48f8b36f72577c38e413f318773c"
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
    "revision": "a28dcf09bb3f1aa4d7908a9f6ee9f34e"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "990289e1510961f943757820a07dab91"
  },
  {
    "url": "tags/AI技术/index.html",
    "revision": "7cebb02405f3cc4e0e526bb43d000257"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "757950a1274068db45f6051273e59580"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "700380f313d6950734a3a420db052d47"
  },
  {
    "url": "tags/js/index.html",
    "revision": "d7d6d9a0a1acd90319ed589319b06c44"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "6fa05647ca2fdaed3b7c9b11cdde4ddd"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "9b4577397ea09a6677f376fc29247b5b"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "04e6df8d15668cc4c4d8b2d933c6d9ed"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "cf413fc854032f0cad348fb7564f1948"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "2e75a27237c29840064d2771eb3e9a55"
  },
  {
    "url": "timeline/index.html",
    "revision": "29a7e7e1f9079aee5b7358112b875aba"
  },
  {
    "url": "学有所思/life.html",
    "revision": "fb02684750ce8c91d32b45b53d0d7352"
  },
  {
    "url": "开发技术/Python/python.html",
    "revision": "14d5bc5a4157a0bff78db73c3b3eda16"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "dd624fe57bdc296636f1286a82839064"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "c4100deac8bb3cf373f6ed1850113889"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "137dcd627e920fe52def0150c0d9418c"
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
