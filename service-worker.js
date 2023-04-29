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
    "revision": "e5da7721da568b51556c8ebd97777342"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "80e6601b88c63a018317fcad71508df5"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "63c2fb99c176d224bfd7e05d368c18e7"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "9cfd2e3b88d0f2e5fcb20fbd52dfff6d"
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
    "url": "assets/js/12.523dbe23.js",
    "revision": "740ee6c51a7d01bc27024a66f162263a"
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
    "url": "assets/js/16.524c169a.js",
    "revision": "972bf1dd8e77492b428b43c36f684bb2"
  },
  {
    "url": "assets/js/17.8668927c.js",
    "revision": "adbc324ad8897da2079f8b7d791e8f57"
  },
  {
    "url": "assets/js/18.5bf03f77.js",
    "revision": "e68579bc251cbca1dc54e62798db6a17"
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
    "url": "assets/js/app.019aef3f.js",
    "revision": "b193ea597a9cc787f6d05a952aeeb084"
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
    "revision": "12f23aab858f62b6c1fd559dbf606175"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "20bf120fd9225bcdd45bb3df42e8beaf"
  },
  {
    "url": "categories/index.html",
    "revision": "85e29b0cc989a5f3cd0a17aaf3332804"
  },
  {
    "url": "categories/java/index.html",
    "revision": "37b06a9e8d449aa9b8cc5e0e3e5ceb04"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "b1fef1360a393f805f857df028bf7a11"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "895a8812c3a132d1e564a29ec0327504"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "d52c1650f18d21cd2c1a77d348b27db3"
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
    "revision": "6f7483d74f845d99aafe734e352d683d"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "513fe6a8bbc505f8c732af5fdc157c46"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "e266890474387890a9dacf7b0e01890a"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "3ca4a62269b0afa67b3735ba8ba0f4f0"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "c489229ed8ebd7d376fdab95e91dd400"
  },
  {
    "url": "tags/js/index.html",
    "revision": "d987b367f7574d34d3b3e0cfc0d1b9a2"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "a38453ec394be32f6842f9b22e1e9e1a"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "fac8926bc2d7723fcda1c260db7536f4"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "d950ff81974fec9d016e634be2052fbd"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "2ee5be00f83bc44d1be52d590b3101ad"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "2230f546309d988a89da282f0772ec96"
  },
  {
    "url": "timeline/index.html",
    "revision": "027b14ae8c1be1d190c7fc0f0a152d68"
  },
  {
    "url": "学有所思/life.html",
    "revision": "6250a5e9bc1527a18c60e43acb83b339"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "5001531e72a96309b1625b8b6a344be8"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "947c8163f87023b663726b1a13f2eaf0"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "4cbfa23058133cae4d4e776c9e74e6d1"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "12b5af2a376959ba5acaae3d1d268189"
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
