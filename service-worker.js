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
    "revision": "55e2c4e20ce6ff8193e1a6ed94694f1b"
  },
  {
    "url": "AI技术/index.html",
    "revision": "0025aadeaae961d6d47038f5490bfc0d"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "fd3b6042d9e2d2faef985a8bef72079e"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "7733d87165428a97f9803e35fb1fe30e"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "36e2f60188ea7d3dee2ff018115c8598"
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
    "url": "assets/js/10.c79fb94f.js",
    "revision": "828fda215786de0ec42a8e002c510270"
  },
  {
    "url": "assets/js/11.4ed36720.js",
    "revision": "e9a0c6c02a88a1873cdefde7827a3a31"
  },
  {
    "url": "assets/js/12.465d68e9.js",
    "revision": "65ba156bfa6d31c0dcdb10fe47972305"
  },
  {
    "url": "assets/js/13.912b4d9b.js",
    "revision": "a002047b72326c8a94aa4dcc5004e23a"
  },
  {
    "url": "assets/js/14.cd898ba3.js",
    "revision": "c0194e4af7702e419a07f3c32f09e68d"
  },
  {
    "url": "assets/js/15.df124822.js",
    "revision": "de2e45ea4bf593ecfe385daff63a5160"
  },
  {
    "url": "assets/js/16.7f8de966.js",
    "revision": "1fb716ad281fb66e8588cbd71e610f1d"
  },
  {
    "url": "assets/js/17.bcbf0994.js",
    "revision": "3e89dc15b1a3c3ff9fdea655c0d1e25f"
  },
  {
    "url": "assets/js/18.1fc1add4.js",
    "revision": "54d7e39e7b997b3d70a0fcc77523ec19"
  },
  {
    "url": "assets/js/19.b44963a6.js",
    "revision": "aefc2b231ec2896385e2daa1191636d2"
  },
  {
    "url": "assets/js/20.101e8566.js",
    "revision": "51490c0c5822c4492df518a863ab5817"
  },
  {
    "url": "assets/js/21.33111d53.js",
    "revision": "bb8f20f60912fad76644016eecc1d42c"
  },
  {
    "url": "assets/js/22.21b46086.js",
    "revision": "99d7b1df2b2b63f571b30fbc787122de"
  },
  {
    "url": "assets/js/4.ac723d9c.js",
    "revision": "a8694b4097261fad2a6959ae947b8f97"
  },
  {
    "url": "assets/js/5.bbfaf8de.js",
    "revision": "97c6f85861396952fa3ae654335c459a"
  },
  {
    "url": "assets/js/6.78cbb24d.js",
    "revision": "5ae2d044d3baaefe9d1956914d57ea9c"
  },
  {
    "url": "assets/js/7.c601a0f3.js",
    "revision": "730ac9d0600f5aab0a76129b605b3a33"
  },
  {
    "url": "assets/js/8.4d6b7ce8.js",
    "revision": "9367897d280e8f20c53543d45959b78d"
  },
  {
    "url": "assets/js/9.a0b475e9.js",
    "revision": "b1a2e65b9f0ca10efced00a0ee68cc49"
  },
  {
    "url": "assets/js/app.4906243a.js",
    "revision": "6078ccb5b9f51d83a56ada55bb5d2d2c"
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
    "revision": "9e9bc9348ad2729ea7d2aedf5dd2de88"
  },
  {
    "url": "categories/index.html",
    "revision": "7677615b5cb57f3d32dbabd35ea77afd"
  },
  {
    "url": "categories/java/index.html",
    "revision": "009d25b65621fbaddfd99c17e42fae14"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "e5d554ff8774a9afe284e23fd0ea5197"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "8298977078909013dd78cb0991c3e4e1"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "23236ce18ab7bade2403b74fe184e0ab"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "0d183e6f8bf3c25e32028c6ac429f161"
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
    "revision": "c64aaf8d7c93f74291da23d1ebbbadf9"
  },
  {
    "url": "img/sidebar_280140.png",
    "revision": "30e2bf90705fc32e783f29a833736c17"
  },
  {
    "url": "img/sidebar_2801401.png",
    "revision": "0c2331a84c22028e9d50010be4c9b71f"
  },
  {
    "url": "img/sidebar_28014022.png",
    "revision": "67ed912a57fe22a89c7ef25bfa3d6c74"
  },
  {
    "url": "index.html",
    "revision": "61d02629c7448d3e5896abc69397e719"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "5d92af7fddc5609ae33916bf1c5a50bb"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "c574ddf752d757715ba56359905cf884"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "f22f0e59df74548a4954deb5c70e4264"
  },
  {
    "url": "tags/js/index.html",
    "revision": "95a00d79fec64ac4af4c74f2e1825a94"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "f9778235b58e0b34d2f6f85b1cfbf05d"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "f3aefec02ae9a6d153498d6a3e9c50d5"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "5acf44926adf903af4b13025e25771e6"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "1c0bf838aab57da37a5e7b7c310988d1"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "3bbf4884118eb6a78128bd412db1357e"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "e1d06a6d8b32613e1ce8d7f94cb80a54"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "df89509cc1d45733b268099a03ca4120"
  },
  {
    "url": "timeline/index.html",
    "revision": "d915ef59e49da579f4173c26bbcc6978"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "bb21d66a5ff8ce063ff1eb44cd84ed9d"
  },
  {
    "url": "开发技术/index.html",
    "revision": "3809ec3e21b2148a7f541172459915c6"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "deea5962a8d49e2374e24f212e143c91"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "eeb7229d2c34f45d43eef4fcd7d9045a"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "d78e1e0e8bcf4a97fea255bfe5bc7877"
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
