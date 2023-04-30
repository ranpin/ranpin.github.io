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
    "revision": "572284d556501a85907c9b9d0e6eb3de"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "1b360fbcc48baade77ccebb111340c8b"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "6032a5398590aded159a18e5f3d9cd7a"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "3b2e30cfb67031c49d637f51f11149eb"
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
    "url": "assets/js/15.720505a2.js",
    "revision": "b704a627f71fe816fca4d87446d5cf4b"
  },
  {
    "url": "assets/js/16.524c169a.js",
    "revision": "972bf1dd8e77492b428b43c36f684bb2"
  },
  {
    "url": "assets/js/17.8668927c.js",
    "revision": "adbc324ad8897da2079f8b7d791e8f57"
  },
  {
    "url": "assets/js/18.b66024ed.js",
    "revision": "d2feb2def1f5c593c7471f2ac5497e56"
  },
  {
    "url": "assets/js/19.91eb0895.js",
    "revision": "de1c2f0d57c378049af7dd45e8835aa1"
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
    "url": "assets/js/app.5b892a70.js",
    "revision": "d52cd517b0c6bfc7a29e2fd85c231f2b"
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
    "revision": "af5b03542bb493cac0f1fa2a87fea5bb"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "f687ff6e7648ce5ca5a8773980e2e456"
  },
  {
    "url": "categories/index.html",
    "revision": "f259dffdfe10de9268afd33be6cee0e0"
  },
  {
    "url": "categories/java/index.html",
    "revision": "fd025e0ee792e389585a90fa617cacfd"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "fd94d685a821f94da8b6b27b17e95dff"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "ccd9cf93c5be3324f8ca4dc66a7956d7"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "895345c306d2519ca46a4a46c126ef51"
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
    "revision": "b5c785e0924bcd7a531d75793aa767ef"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "a69355f2e49263ebd5826ac99e496138"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "c3887d965dcfae73c75486d2a8e74292"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "56fc6a66924e9e1f7c446bf3c3d523fc"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "742a09272b93cdb85ba3bcffcdd1a489"
  },
  {
    "url": "tags/js/index.html",
    "revision": "677a0ef89c52e669a10c1ef5219ba085"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "1974b35ea5923c4e49b5edce9045a3db"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "8897cadc8216caf859e238b1ed67c786"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "8d30718f9a2ea6673c214d1d553d0ed3"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "b0512bf24cdc0a5ff8ad2a7d7140d509"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "bc7ad47e2c5df71641769c44b5a06ecc"
  },
  {
    "url": "timeline/index.html",
    "revision": "f9b783b0308c1dd4ce3b695b245d88dd"
  },
  {
    "url": "学有所思/life.html",
    "revision": "45f6b6f01683bcf5cde22cc329097dc1"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "cf906a69f2f20e31c08796b7a19abdbf"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "7d5739dd044e79b61f39ff93786dfb51"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "e7f7aa624115092564f114b1663d5408"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "923322d7fd0ec84f649111ea7e2be5ce"
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
