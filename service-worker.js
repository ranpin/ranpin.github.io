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
    "revision": "c292c8b1d609cf3ad7a785f1859246af"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "169407ac8e433351411678e44cfd0f3c"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "d882cff0d5d55caf9f20e433610bf210"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "8398ba2160e35180cbe52dfb1aebe6bd"
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
    "url": "assets/js/1.f5d79b1d.js",
    "revision": "80e874d935fa04ef0a3cf70f0f0b5935"
  },
  {
    "url": "assets/js/10.03c0b8fe.js",
    "revision": "d80f294664c7d1a5819c01ad918fbbb7"
  },
  {
    "url": "assets/js/11.1798fa3f.js",
    "revision": "f691bd867cc34565cc44645d382a8e2e"
  },
  {
    "url": "assets/js/12.f4ab899a.js",
    "revision": "dd3d34300ee4475e176bf18b43440ab7"
  },
  {
    "url": "assets/js/13.0b5f1178.js",
    "revision": "3bd1e22ed5589bdc750813cb23fdd61f"
  },
  {
    "url": "assets/js/14.3442bf0d.js",
    "revision": "c9de225a5353710849c901cd2435f3c5"
  },
  {
    "url": "assets/js/15.bc033e0c.js",
    "revision": "e7d0bce6bb798bccb7b4a5ebfd323ed4"
  },
  {
    "url": "assets/js/16.6d48cbad.js",
    "revision": "d2f1cb4a44c12db217dcc27ad93873f8"
  },
  {
    "url": "assets/js/17.e4a0b6ec.js",
    "revision": "92751a716518ee63accfd6d0ae7a6787"
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
    "url": "assets/js/4.77550293.js",
    "revision": "b628498c134d43b63e6ef1e38b1625d7"
  },
  {
    "url": "assets/js/5.616f5f1a.js",
    "revision": "724f97a248e23bd4243fe4c7a092e809"
  },
  {
    "url": "assets/js/6.5592fcbe.js",
    "revision": "5544e774205cf901af74a53f5d52a539"
  },
  {
    "url": "assets/js/7.c53857df.js",
    "revision": "9889ef9ba681b50fa1991981bc58cc70"
  },
  {
    "url": "assets/js/8.2242ecd8.js",
    "revision": "2ade43a1e022053bf0a2b87f597799e9"
  },
  {
    "url": "assets/js/9.19e575fa.js",
    "revision": "05f42e2a1c21414a549f96311dc42cb0"
  },
  {
    "url": "assets/js/app.1f8e8358.js",
    "revision": "f3e9feaa7ca5aa76a1e15128b825c8a1"
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
    "url": "categories/AI开发/index.html",
    "revision": "b99f0fbe4bbd66dc1fcfd235611c9874"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "939bec6c946cce3d6ed8f056bff2e13f"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "bbd2fab3176d2c5ea0713442a14dea71"
  },
  {
    "url": "categories/index.html",
    "revision": "4a438b844b1e4ff29407209c4b65025d"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "f9b261e263d53232c020f54c180a9f8f"
  },
  {
    "url": "categories/TensorFlow/index.html",
    "revision": "22a1a155c7e0751d60a8db768a8b6d22"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "535a5fa760e2ebfa9b305d718912c271"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "0dd424ac30aa78cce2ea2c2e5374b0a2"
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
    "revision": "7e905ac69d712af907244671e145f07c"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "ba38d43a50b0da3fc865246c486188c1"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "ad8c69294cf00078e522389e4f634237"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "071c08c9be205933f668403805ca4487"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "2bd88e00206ab0b85e21b05e11b26178"
  },
  {
    "url": "tags/js/index.html",
    "revision": "6039c4770d9d982c2e531618841f20ec"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "c73945b978a09db7719d805fedf5e8e1"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "f08121116ab0c340f18ce00e16c631cb"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "2f0a4f3eb27334c14ab321e26487fecb"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "0d4c5d303d14ac496443f6382f173b88"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "c4d2762e51dc097dc777c1a97a6fe12c"
  },
  {
    "url": "timeline/index.html",
    "revision": "6a4f994d7b9220e67f7986aa38b5d2c2"
  },
  {
    "url": "学有所思/life.html",
    "revision": "98a44899453b4cc3cd068bb0364a06ad"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "bd531dbb39e4b732f93cbd26b5b415f1"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "73b9521a533bbc5a52a909c55d9c47dc"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "aad9c98d9ea2a3418bca01742d817e3c"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "24670ed20cb3e4c8e019f1ad26907029"
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
