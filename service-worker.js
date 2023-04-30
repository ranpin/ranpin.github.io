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
    "revision": "5edf39ce9f18008deddd8adf3275332f"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "aaf27e1e30ba4344c76bb6c8a85dd981"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "a868a700c61ff24c5692944c7f888893"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "297abd138b78d50748c69c8b3cebc700"
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
    "url": "assets/js/12.b1ce85fe.js",
    "revision": "34653fd8578b4da186b80fbba303d174"
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
    "url": "assets/js/16.6e75928d.js",
    "revision": "9c0fac4270ee03212a4a605c98c72921"
  },
  {
    "url": "assets/js/17.8668927c.js",
    "revision": "adbc324ad8897da2079f8b7d791e8f57"
  },
  {
    "url": "assets/js/18.5f608851.js",
    "revision": "269aba192355df77612c01866d3a3cd1"
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
    "url": "assets/js/app.38dac50c.js",
    "revision": "aafce99a71361d7b626ff9a7f7860c94"
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
    "revision": "86f9bbda8249756e603ad673f8c13a45"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "0638bb1cb118b74ba56ba142d37aefb8"
  },
  {
    "url": "categories/index.html",
    "revision": "a5ab5d9a7e2a326df77be6440dc9b9c4"
  },
  {
    "url": "categories/java/index.html",
    "revision": "7c26fb279dfc19f383de85778729bc4b"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "3ad12bad0c4a7fbd1c4f660bbc534400"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "ef5838955a97124be1e05372d64f2b84"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "b11357fa0c073a9902f984f384a529e8"
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
    "revision": "69aa408778d16d2794851d7dc0945b80"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "2cdea2b4b7dddd955203e0de3042bd12"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "c0001140711561b1aa1146dd1088510c"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "62bf852fa2710d69b379440a89bb67d9"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "68f0d7cd78d435f8e7428a706813222a"
  },
  {
    "url": "tags/js/index.html",
    "revision": "38006cc44e82474e70df5d0c1f6668ee"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "421171f88403785fb5b582e876ec9a99"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "435f7c2c165a9b3c368a0b15fce2d9da"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "7bdd0c943ff4487d59ef8275d75b72e6"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "d76f2f27cf237de25fe2f5b1d6e6e0f7"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "3f4c6caa0d13e9c6c6ba210f965efc8f"
  },
  {
    "url": "timeline/index.html",
    "revision": "ea01c1e3ac9d253dfb944c821fea56a1"
  },
  {
    "url": "学有所思/life.html",
    "revision": "1a07fe07530d2e958671c627695c0734"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "799b1a0c4c5869901c70500ddc3b1d65"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "2e16049aaecbd3ed27efd6b8ee93a4ed"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "1e2d2c4aefc88fd223849dfcdfb14178"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "57a3323c1e2117c7b5a01f3328af8041"
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
