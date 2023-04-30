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
    "revision": "955005cefa7ca15fda13284c975ebc82"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "3ecdabed20048453bedbada636f249a6"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "fabbefb69546f6bfd93c6d1bfa5009d7"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "cd0bd889b23f99f60449828dda10c24f"
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
    "url": "assets/js/17.5fb879c1.js",
    "revision": "a7f6932a7dac74b2a8d1ad7a8741c6bc"
  },
  {
    "url": "assets/js/18.1a3860ec.js",
    "revision": "8b181f932ab855134dc59f19b4440601"
  },
  {
    "url": "assets/js/19.d44bd57d.js",
    "revision": "619395d44d1b5cc9ef082858f2308510"
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
    "url": "assets/js/app.3a7f56d3.js",
    "revision": "e88fc0e6a9ac1ab602183c0bf0ed5b36"
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
    "revision": "1b9684404f5f73b976a29b00db10b315"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "4c50dab797d13f855b413d8fa5ffe743"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "98581e590eed3328908589277ae28bd6"
  },
  {
    "url": "categories/index.html",
    "revision": "7594c5039417e539efacf807305ebb04"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "3666e17632258af2716eaa1be1e291b8"
  },
  {
    "url": "categories/TensorFlow/index.html",
    "revision": "726c0f6345714f1c749a85573d31f884"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "d37f115f195c7e26ee3a84f938009d5f"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "cf681bd7e2c85de1c18f2ca26a84dfa7"
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
    "revision": "551ad1493d2e4c96518bf45a250f1a17"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "97505be575231794a9db12b575ca09d9"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "c16faec4c2ca95583acbe0313c2179c8"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "b8cee9d8f6006e59f8543f4e45d5cb3f"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "304a901e4eebc981492524e1e342a17e"
  },
  {
    "url": "tags/js/index.html",
    "revision": "0647cea604de5dd98742a4913ea9f3dc"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "dc6359e2dd711ff2c2fdced6096f9782"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "c50b53d874e5823789a2f925fe57567b"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "4b3cd9eb7b48d7b892b2101791a53ff9"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "7e7c92f3f0ab4c6bb47299118ff81a3a"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "8d3c37ac2a48448b82aed26e555549f3"
  },
  {
    "url": "timeline/index.html",
    "revision": "f5f20945cce9af2896fdba10f6f34a21"
  },
  {
    "url": "学有所思/life.html",
    "revision": "49491897a2b985c75a86d71649b29771"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "93cd1a87869fced839770f49e07951ec"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "53be1f0a50b956ae4fe21d03527d5636"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "f8c1238985f8bc809657d6eccfb66ed3"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "92a82e285cf1f34450b2ddb85f5e4fc0"
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
