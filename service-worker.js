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
    "revision": "05899f9f1dba76f47f68f63ac616e638"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "2bd43b58b5f5d7c2c26e7a214b71b817"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "5b1e1102fc02885cebd8763a666974bb"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "2b09bc49b35e78583d0a7580cbdaec4b"
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
    "url": "assets/js/13.c2fe4acb.js",
    "revision": "91c93b3924a1d6b87710001ebb4d765c"
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
    "url": "assets/js/18.6066f09c.js",
    "revision": "cd7ade18bb65377b850b7908e2eafdf7"
  },
  {
    "url": "assets/js/19.5f7cd3f5.js",
    "revision": "5706886b0dc71bbcffceb3941364ebc1"
  },
  {
    "url": "assets/js/20.070a7df6.js",
    "revision": "ab0009a0314e6aefa7d7c2392607149c"
  },
  {
    "url": "assets/js/21.3f9737d6.js",
    "revision": "8bd0ea016c81955759041d417c579292"
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
    "url": "assets/js/app.cd551ea1.js",
    "revision": "0fa021a147bd5a29b29288a5e3c76a65"
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
    "revision": "651500fe1c1ef49c026703986b02e55f"
  },
  {
    "url": "categories/java/index.html",
    "revision": "64d3697818a1938fa2063b6f2541e0de"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "6229a18e2ef7c9d54df1bf20405e2190"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "0a13c95da922a7b1930500f7c25f7873"
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
    "revision": "293ead4741c8ae86dc49503e310beb07"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "f9a2fb95f0ad2d89cdc5b170b4b37a12"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "edafd3e8b8ae6448241bd2ebd7ed836a"
  },
  {
    "url": "tags/js/index.html",
    "revision": "df9893f2d760e5c640bbee9d787e82b4"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "835bcb8e0499408fa14f376d44ae118e"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "22a73733a127606ec4861d0d522d13dc"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "ce9f972ca77265996e653edcfd28cf03"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "546f132bae694dfdff19ec695fa17044"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "f22bbc42779cb4b9ac8baa99fb3b1303"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "b234a16f06b2605ac9c3af583c4a740a"
  },
  {
    "url": "timeline/index.html",
    "revision": "f50c7542d4385b0bb569f128a07dbc85"
  },
  {
    "url": "学有所思/life.html",
    "revision": "50d310024db84a0e701321b8c12a8301"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "81a293a700338c6591e1cbe4a6339d03"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "a059c26567684dac01a7448c0665dba5"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "f5c1ea53809b402bfdcc4be0bc0b947f"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "996090b2ef546ce7d4bf91b9126fe568"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "20bbdd75a4c65c57672e2d8d8c732015"
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
