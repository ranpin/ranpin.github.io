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
    "revision": "83c1931784ce1135fd6162801df9c0c3"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "f0e16dcd9a8ca353daa321be7e5cdaef"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "7509a67cd5e0d66279e2ba81de6de95c"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "e68a7ddd9fb15c311e9b3d5b71fec934"
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
    "url": "assets/js/14.ebd191e6.js",
    "revision": "350bdd066e3fe43872fd592825192985"
  },
  {
    "url": "assets/js/15.78ea4cb9.js",
    "revision": "14b73961471dc8912e6b62425db1be73"
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
    "url": "assets/js/18.5f608851.js",
    "revision": "269aba192355df77612c01866d3a3cd1"
  },
  {
    "url": "assets/js/19.91eb0895.js",
    "revision": "de1c2f0d57c378049af7dd45e8835aa1"
  },
  {
    "url": "assets/js/20.5469bd55.js",
    "revision": "9c190ce8fb331dec23f2e1527c316287"
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
    "url": "assets/js/app.195c51a8.js",
    "revision": "c0549fea28519ffa04e6e40ffc1adfb6"
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
    "revision": "d033270ed3284b46b8cbdb45d02f9c50"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "226e43a483efe8ed088af46c85729dd5"
  },
  {
    "url": "categories/index.html",
    "revision": "0e0a01a782457473af4b66534aa107a0"
  },
  {
    "url": "categories/java/index.html",
    "revision": "3c69139b32d168e80f85fb4fc0f72cf0"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "71534349483e42b3bce7c52ebec5b0e1"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "c624ee250631813d44ba4395e0801b40"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "cb38bc133624bb1a58d03a9c9bc4fd56"
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
    "revision": "d548505d6cde2023acc3211a8abbd0e1"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "46145c24a302155097af128047b25dab"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "e9518efcdfbc08df20b12cb3566219fe"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "7f426322b2e3f838dbf8678c64066b1d"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "2566603db6afb34cca5cde20707d42b6"
  },
  {
    "url": "tags/js/index.html",
    "revision": "56d304ce8450eb48b34a1b5fc7218953"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "bac5c844e6da1a08b5345cee14526095"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "01d0e1886cef85422926b401eead9107"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "b39f0916fee7c1ccca611e5875f0781e"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "498b16274c0d7427930ab31ad014c0c1"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "a703c12095510ae338519be5969878c6"
  },
  {
    "url": "timeline/index.html",
    "revision": "39cc4a7cc9b88196f6107b19dd5ed230"
  },
  {
    "url": "学有所思/life.html",
    "revision": "6b9423e0bb20cd09d05d9772b2d5f312"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "2fc639e97b89d0e0495c410d6b47fe0d"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "cdf9e25536663d6b83a5dd6c018d2751"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "9c83d9e0804d6d1c7189bb7bebbfc9bd"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "15e4de8f1a8f0b8ac8c079309ed3eea3"
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
