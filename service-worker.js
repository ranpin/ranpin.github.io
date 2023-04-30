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
    "revision": "1b1e8d5e5e5502a08b7b96c13df75ae7"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "e30e97b2259986d6b9058fcd430147e0"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "b69f1e65d5b431ef1c5f52979dc33300"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "a8c1022a4d8bcf86f0f7493105031d86"
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
    "url": "assets/js/17.76382ba7.js",
    "revision": "9113283e6316725f86b52675504df64b"
  },
  {
    "url": "assets/js/18.e0a92d33.js",
    "revision": "3036515b5d47f33a69b33ba21fcabed3"
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
    "url": "assets/js/app.b6155a49.js",
    "revision": "6b430abfdef13575970081e51e917340"
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
    "revision": "606131544066244ca02b150e74a083ac"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "222b576ad430d02f97aff718589593c0"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "481e763eeb26c87e5f1fb7090fd39675"
  },
  {
    "url": "categories/index.html",
    "revision": "8572b103c3e68d5e76a5d40ce91af13f"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "03565bd6cdd04c3cda3baa9e1256c3fc"
  },
  {
    "url": "categories/TensorFlow/index.html",
    "revision": "e6d5110ba56460c36b56d03b1c751add"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "ed2e2a01e0ba2f7f8f10c6139d1c42a4"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "668c43191276938fd229a74e7406cd45"
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
    "revision": "d594c53040f7eae854798f6ef64f7951"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "afdf485720b553320e7eec14aa6e37b8"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "24d8637dceaf3c0a47786044e16d0a3b"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "644bc1413173776880659ad523cacbdd"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "2d0ee6772a1938398f9bef091368a040"
  },
  {
    "url": "tags/js/index.html",
    "revision": "6ed2f31c8711aebb759d3aca36f750b2"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "89f8726dd4302daf6665c57e8b881efd"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "e7ff5aaeb3eb8ccaae17fec457ec487f"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "093530a4f2fbbae877014fd9c0fbc24b"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "e2bb92891ad4efe4e85f8d56a0d51ea0"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "89308759c4240fc85a0f31e37cb53dcb"
  },
  {
    "url": "timeline/index.html",
    "revision": "accef89c4e2d2baa77a538b00c35532a"
  },
  {
    "url": "学有所思/life.html",
    "revision": "633119d8847a1b18c5b3ecbce73bc035"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "a48ff95fedf5a4571bc011af9243d7f1"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "37600113d4d570020fc556991b92173a"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "4628b7a51ef9136d9d4a5a5a85b0fb4c"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "7cea543d425be79746df8904b22ebe3f"
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
