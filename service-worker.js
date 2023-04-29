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
    "revision": "b37cc4f08018c13865f47e1568d0b861"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "488351c6b66b17010ce24592ef7fbf94"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "ebb64093918964a2f5978424df340901"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "c60aebd7083848a1a70eb2ffcf5537b8"
  },
  {
    "url": "assets/css/0.styles.449bfb42.css",
    "revision": "8734d6de1153c355ab64f0b64d815ca8"
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
    "url": "assets/js/1.63059836.js",
    "revision": "e23348ec57b63d4e4247c4301c291728"
  },
  {
    "url": "assets/js/10.a4b36c46.js",
    "revision": "1c9f10294461ed03434999cc9fc59678"
  },
  {
    "url": "assets/js/11.36cae62c.js",
    "revision": "5e65997ddd0bb31e19310ab53da24725"
  },
  {
    "url": "assets/js/12.52a6e445.js",
    "revision": "a454699790b526babd4a1c462c872e57"
  },
  {
    "url": "assets/js/13.79c84239.js",
    "revision": "638ff6b1e603afed414afee5d0d914c4"
  },
  {
    "url": "assets/js/14.27d5ab08.js",
    "revision": "26455924bdb9b54d05b397104e348d94"
  },
  {
    "url": "assets/js/15.f9ce6a4c.js",
    "revision": "def76daa4b93f21d04c7c797f7d7853a"
  },
  {
    "url": "assets/js/16.6c143f20.js",
    "revision": "7f5536fb1546b33b6b9d671e24dd20ba"
  },
  {
    "url": "assets/js/17.b00c02df.js",
    "revision": "7af04604bd9967643dbdd909a84f0088"
  },
  {
    "url": "assets/js/18.b66024ed.js",
    "revision": "d2feb2def1f5c593c7471f2ac5497e56"
  },
  {
    "url": "assets/js/19.fce98240.js",
    "revision": "8ef8419bbec9f490004316a5eb9926f5"
  },
  {
    "url": "assets/js/20.ea557779.js",
    "revision": "9e302cdba0d3ed8f76af4c1bae1209a9"
  },
  {
    "url": "assets/js/4.b6632328.js",
    "revision": "d727ebf31f58b7bd260ca5be49c4a73b"
  },
  {
    "url": "assets/js/5.9ab1b9cc.js",
    "revision": "358f2b62b70d0fef302396ba2889e03f"
  },
  {
    "url": "assets/js/6.bc303a86.js",
    "revision": "36b373426df0a9b39e7fb9cd9788ebf1"
  },
  {
    "url": "assets/js/7.fbd7fa4b.js",
    "revision": "db4b487a9aae52a6d37d9b471fe3b881"
  },
  {
    "url": "assets/js/8.511120bb.js",
    "revision": "7cdb1fc391c14800bf8aca1260691339"
  },
  {
    "url": "assets/js/9.3dfe062e.js",
    "revision": "dd03b24b528d080a5d563ee4dd7736a0"
  },
  {
    "url": "assets/js/app.d40df5c1.js",
    "revision": "5b5685e19af92975aeea7dad60c67c7d"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.46368470.js",
    "revision": "316ca9c52efec5b02a81cbfcefbb21d2"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "3e5675a481d7e8dc260c406dfc8bad5f"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "b8d8ad70408595aaf8585cc14ab893d5"
  },
  {
    "url": "categories/index.html",
    "revision": "10b2430fc0708ba2defb8a290a81913d"
  },
  {
    "url": "categories/java/index.html",
    "revision": "b11db275925002834455ccb9bec42285"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "c1c752d74a802e92ba024489e74765e9"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "353eb0789be251eca5f82ec75a94d451"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "a68c1ee867780c5c55eb28066f6b3251"
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
    "revision": "ce9e9e34ab865a7300eab484e2f24092"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "fef824002bd60e49fe519844135b72ea"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "6bf08e149afc962b9cb9bcb2f54ebae6"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "b51b86ee5877cdecb8ed685b7099639b"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "d1e14c21574f2bb681e91a089234439a"
  },
  {
    "url": "tags/js/index.html",
    "revision": "def1321e5f729f1d05dd1402edad9110"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "b093805950fd4380e70f1b25cf4cb4fb"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "a81972a9ec6ec83fbd47415210a61363"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "c9c2f0deb8a3b38d990fbaeefbe25f85"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "38097e36640e472f9f8928758a5c6cb3"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "92499978ceaf7efe3493b2df762a14ac"
  },
  {
    "url": "timeline/index.html",
    "revision": "8bf0c358d672f938544d58aa7b152162"
  },
  {
    "url": "学有所思/life.html",
    "revision": "a480e5980ef955ad272da9b7a23faf4d"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "e3eeb224210c0899467b45ec7d1a0fb9"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "75ddf7decc772c9509da2ed6a3bf401d"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "a4de8e250131341393e12d945ef92ffa"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "e42163efd8540d682f620af63fb5aaa2"
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
