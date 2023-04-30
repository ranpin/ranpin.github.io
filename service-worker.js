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
    "revision": "464457734379b39a19c8e20545c37030"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "cbbed650260027bd573fbd829403bb29"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "f913246ef91807c3fc337819a82c1dd4"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "662fde43c3c7ae3746ed83937bc8d3ea"
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
    "url": "assets/js/12.129291ae.js",
    "revision": "4413291e5189ab39647e678eb1ff54ed"
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
    "url": "assets/js/15.f038364c.js",
    "revision": "38be1d7d3247e0e1a6c108d078a3429f"
  },
  {
    "url": "assets/js/16.6c143f20.js",
    "revision": "7f5536fb1546b33b6b9d671e24dd20ba"
  },
  {
    "url": "assets/js/17.179982f8.js",
    "revision": "1c2ed1849baf75ecdad17535372f2fa6"
  },
  {
    "url": "assets/js/18.ce5c86f7.js",
    "revision": "5f32a9b93771e07919ad8a6d596eccdd"
  },
  {
    "url": "assets/js/19.4a634978.js",
    "revision": "2fe39f8e9a478e96a5306b155a7cff35"
  },
  {
    "url": "assets/js/20.3f206977.js",
    "revision": "0f90315c548edb4c7cb194019d7b8669"
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
    "url": "assets/js/app.b5e63cfc.js",
    "revision": "78f4b9903bfd1da987d0e9265bc9ea2a"
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
    "revision": "072662f37903c1f2dbb00b88e22d9be9"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "400883196c243c70aee5025f0f60bae9"
  },
  {
    "url": "categories/index.html",
    "revision": "5fe711c7bc8ce45ca1c6a1a256a6fbea"
  },
  {
    "url": "categories/java/index.html",
    "revision": "b9da10206e9d2e6ab850efe8f97490a5"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "c2de86f0cf5ca45e488632303bfc25ae"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "3b65b3471b3341ebf0c6c4bd428cc044"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "07b1d23c9ceb7925863ee033a98b6d2a"
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
    "revision": "e65f8c44028b5f3a409d78e24a5195b8"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "0c8348574d910979baa62df61adb8390"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "afeb2abdf5da14da7d756ecc20c84336"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "550a4a3bb90ca2a6faefccf930563be3"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "79b5daa834c05cc61701525a4665f541"
  },
  {
    "url": "tags/js/index.html",
    "revision": "284e9f20ff0019c2ace4edd17d161dad"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "50aa1e294b339bbfb4afe0bc9adb1757"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "5b740401302854c0d7fe0e53b33f6c8f"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "05e5a7ed4091e0cd2c7d2fab2df52030"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "c34c79868f78b5bf10537a7b05de2fd0"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "b2dc8afb69175b345dd700ad7b09a8e3"
  },
  {
    "url": "timeline/index.html",
    "revision": "0d24dc0447ce2cfbb9be1012ea9442d0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "c286a904d185ec7be28ebc08f080cef2"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "6099f430fc29b3bf4bbcf8a80e5cbe85"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "b92a65b3aa4aaa907771ce87df75f20a"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "199d778a5bd841ef25e71b2be24dcb77"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "8234a2075b393430b966b965cce2cf7f"
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
