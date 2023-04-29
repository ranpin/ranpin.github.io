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
    "revision": "1406f498cef9bd9321973479bbdd67d2"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "347a4030fced8e3451a7f20f6ae3b151"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "d738bbd67eb3a332accc16777a04943a"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "85abc0b85602cebbf23a0d45ea7c37b4"
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
    "url": "assets/js/13.f5756029.js",
    "revision": "21c4609b8ee8a287f9ba700e6bea2daf"
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
    "url": "assets/js/18.e4d45960.js",
    "revision": "d582b41d2126f1249372c94e8374c7ce"
  },
  {
    "url": "assets/js/19.d4fefe54.js",
    "revision": "763b39bcc20cedcbf7be543242a4ea2d"
  },
  {
    "url": "assets/js/20.55976e37.js",
    "revision": "39a6fcf65bd899d756a5a21d9e4f5bdb"
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
    "url": "assets/js/app.80aeaeb4.js",
    "revision": "f89b703dc47b76167c3d406376046f01"
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
    "revision": "27ae5a75fbc6d4e7b5c31f63f128391e"
  },
  {
    "url": "categories/java/index.html",
    "revision": "b7fcb009cf46ad1665c541103fe40a5c"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "5125b1af2586815a8aa54cfdbc3845c7"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "db3d8ee0509eb5be0083fcdaf3a74a9d"
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
    "revision": "ee9c7698e9e32f0c52444d61a044f3fe"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "f4764cb33c2be70a39c3ef10622bb33b"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "72cc4d93365f18345275482f12434499"
  },
  {
    "url": "tags/js/index.html",
    "revision": "d2e3aeb053f389b67b5ae35c675ab36c"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "7629e6d0033c449ea70d76cc630595e2"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "d3323174a8763e4a292ac1fbbd15359b"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "9e385bb99c6f35999a2f51a467fb09bd"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "948bb395ee758dc6535882851cdfe8ac"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "34c5f3d435185e184a92ffedd7ef78f4"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "a4122ab189da1f24c41a01ea2af12af2"
  },
  {
    "url": "timeline/index.html",
    "revision": "a0a9541e5fb3c76962f2ea8b96c9e58b"
  },
  {
    "url": "学有所思/life.html",
    "revision": "cd80fda393c19f3024b55b1a964a2cd4"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "97bf5c76b05d54cabbbbafc5cef2a444"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "5f93ac48582f29be95b9c2007b38d22d"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "cc14dee3360523ada1fd43aea9acb7de"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "87fed85a78a28bd225e9be3df45748fe"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "1948b828812f067b9af3b14d3646115f"
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
