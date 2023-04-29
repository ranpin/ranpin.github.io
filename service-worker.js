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
    "revision": "ae91896c098b21ab845b77b4a50d36ff"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "c9e00bc194337eb6381fc5def2e1cbf9"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "6e08d7a41e55d67e9bf88d8c9b97fec5"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "de20b16900d02bf0bf264fa6a9ab0ee7"
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
    "url": "assets/js/17.69bc8e46.js",
    "revision": "a12f3d3f1bbe28a7cdfa30b38f29a68f"
  },
  {
    "url": "assets/js/18.2179d236.js",
    "revision": "8beae043880c751ea6ffc2a473927171"
  },
  {
    "url": "assets/js/19.23d638dd.js",
    "revision": "0fbc06b330d956aaa2230dc42bfde6d3"
  },
  {
    "url": "assets/js/20.297f0db9.js",
    "revision": "5183cab36b24e98ace524ecd3299241d"
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
    "url": "assets/js/app.2a828702.js",
    "revision": "617b9757b2214a252bf5a40d1a2895f2"
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
    "revision": "7a7b11056a596d7f28ea07d02211bee5"
  },
  {
    "url": "categories/java/index.html",
    "revision": "427c1817d4629f0b3d06dcae061f0f54"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "08bc5d72b6be1da4657f7c9e2a302d64"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "e6ceafb97224ede05e1ef6a504e6499d"
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
    "revision": "2f46f77d19e508dc5fbf83fe98a723ca"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "e86b55569a53babddc2ca1bf8a7800a4"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "0affe6446fbc9b9041b1a4b67d9c9938"
  },
  {
    "url": "tags/js/index.html",
    "revision": "4b09980d98d308662ba55e499074ff07"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "11b3f9fdfe7b3cd27158843288d69dd1"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "9778eeb5eca168c72237c81992254093"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "cf1da804aeba83ffd88be82f6a037be0"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "3ddceaad0433dc9a1edaf5ec996d6f67"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "e9acdd915114578e65bb1e090d94c921"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "6e2994301b5c66963a5bafcf0de9bf6c"
  },
  {
    "url": "timeline/index.html",
    "revision": "a1c49be68dfa7ed834a60fd068781011"
  },
  {
    "url": "学有所思/life.html",
    "revision": "197bfc6dd69aacb70976267e611abe5a"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "35d148756878458e5d94cac1c9ce86ac"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "f60621fbbec93865d720ca60ad7b5c85"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "b5c722a143ed7604f7c5ac5b57980712"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "bb99eb355e01741413ecacaaac70f379"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "934f2dd47022d888aa48e40c8a389697"
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
