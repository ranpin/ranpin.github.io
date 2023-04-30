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
    "revision": "0041707fb71801f75896dd26b3f664d2"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "b709c946014e98cdd4d7e5f665b80f6e"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "59bc356b28009c3d267c814987bf9382"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "77d1be3ebefaf6e261d8937249172b1f"
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
    "url": "assets/js/16.cc052a1b.js",
    "revision": "3896b08af31b668cc6f8037b0f8167e9"
  },
  {
    "url": "assets/js/17.8668927c.js",
    "revision": "adbc324ad8897da2079f8b7d791e8f57"
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
    "url": "assets/js/app.bce8c28b.js",
    "revision": "862d2c79fac6cff86a48980a6514f3a8"
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
    "revision": "4ef495b20316cda1171cd10d72316fe5"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "5ef570f5322aa8e633f318267fa059eb"
  },
  {
    "url": "categories/index.html",
    "revision": "d5b59096bc92ad333105e8a7b9f238c4"
  },
  {
    "url": "categories/java/index.html",
    "revision": "7e0046087880fd8795931ba39d653afa"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "ee2a8a57a29962525e718a1067cb077b"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "d6ea189bb862b74eec4321c8e8162ce6"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "407b725cfcc63cae147bda26b2cfbf0e"
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
    "revision": "9617d86b7dd52acdb60798e27b67c8dc"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "580d60553e88dddb84980b247dba4283"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "eb663a350f9c67f38b0c6a4233c981c5"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "d1c9652de2342ef98a7b0c6d47dd78d5"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "dfb5f7ce633ada7cb40d7db20dffdb66"
  },
  {
    "url": "tags/js/index.html",
    "revision": "4d9b9e0bd7c61a3867e62feaaa74c783"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "52d15f153e76cc6fc1f27df3487e1225"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "025174a2c9beb3d86f7af5bb3a0202ab"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "db9e41945763aa7623ec3bab97422a8c"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "f188211aad041e5abde6c055de4e5846"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "73f936256f99d1fb4c91e60335498521"
  },
  {
    "url": "timeline/index.html",
    "revision": "4b9931d569f4e5295246f2c727a7b0bb"
  },
  {
    "url": "学有所思/life.html",
    "revision": "d7b3756faf997c4b328cc1a3051b8596"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "bce1963b514a3fb2e3b864a5ea6e568b"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "a0d4fded89777be601ee0daec885d1bc"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "14225cf439d2cb25e96b07c28117b07b"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "a7464d7349513a31bab341ec206a2605"
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
