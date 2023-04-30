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
    "revision": "7aa28ae8d523fbf520cb9651495de928"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "489467cdcba0b04676baebd97f9d050b"
  },
  {
    "url": "categories/index.html",
    "revision": "5fe711c7bc8ce45ca1c6a1a256a6fbea"
  },
  {
    "url": "categories/java/index.html",
    "revision": "72ccd4e50c18369921152bb0dde82335"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "0d78c3b8ca09c1abe281b18928f9602f"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "fc945318ae9620e4e76e28607640667b"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "98b103903be6c14e2adec35c8d60b7c8"
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
    "revision": "b488f56f637ad840a65cad99711d49e6"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "8e86e5b83ad8c25d77ec114958a1a4a9"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "5976c1083de3dd8186773f463d812467"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "6408753782c92c16c0b720d1e408ac91"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "67871a636f251b6aca162dd187d2ff75"
  },
  {
    "url": "tags/js/index.html",
    "revision": "90137e404cbaf81f4cdcf2302146df09"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "7ed4e7ed288faca95dd32cd9eea31129"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "fa7d4c380846518c648b7210577f6e19"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "7b79bb0eb09ce86c9210dc4ba9906d7f"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "334f33567a373227453f3e24a3cfaf19"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "677f5b1129e52b998b360142233b7b14"
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
