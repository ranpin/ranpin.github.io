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
    "revision": "ac06e8f9de343fc1a3134357f4ab5259"
  },
  {
    "url": "AI技术/index.html",
    "revision": "bc2fec0d6aaa504f5ad6e8f6c4afa07a"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "5575a628f87b34521d706848a53f1500"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "49efbf323024071700b6206fce504725"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "da2e3902d52b91e9c0c4bcd0042314b3"
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
    "url": "assets/js/1.42d63d7e.js",
    "revision": "dd968479593012df5068e5f3a476fc89"
  },
  {
    "url": "assets/js/10.c79fb94f.js",
    "revision": "828fda215786de0ec42a8e002c510270"
  },
  {
    "url": "assets/js/11.4ed36720.js",
    "revision": "e9a0c6c02a88a1873cdefde7827a3a31"
  },
  {
    "url": "assets/js/12.d79fb7cd.js",
    "revision": "d632f975b1a0da837ee542b29b5550b7"
  },
  {
    "url": "assets/js/13.465e9b87.js",
    "revision": "4f3bf881b200e54816ad804006855576"
  },
  {
    "url": "assets/js/14.c34cf664.js",
    "revision": "72f876d87fa57025343c952977becfb8"
  },
  {
    "url": "assets/js/15.fdff505f.js",
    "revision": "6d15711cf0829907a5fd0c7352151578"
  },
  {
    "url": "assets/js/16.f1eaccff.js",
    "revision": "72ff44b0404084f5859bce6d5a198515"
  },
  {
    "url": "assets/js/17.8e4f6593.js",
    "revision": "b8425cbb31d49d8e1a7b63d6cd00c457"
  },
  {
    "url": "assets/js/18.3c3e2156.js",
    "revision": "44b80d782efe22f08fb03054e707ce6f"
  },
  {
    "url": "assets/js/19.c6c7f2f8.js",
    "revision": "35c8d958ecc06b4247e729dc9911d815"
  },
  {
    "url": "assets/js/20.590d2fd0.js",
    "revision": "5a2c6f5a96a2bff4cbab85bdd220a5fa"
  },
  {
    "url": "assets/js/21.23abbb36.js",
    "revision": "b68da05a8781f592909d7ba2f49b6bb2"
  },
  {
    "url": "assets/js/22.acbb84e5.js",
    "revision": "79260d1ea561482b84ebc1ec7e04500f"
  },
  {
    "url": "assets/js/4.ac723d9c.js",
    "revision": "a8694b4097261fad2a6959ae947b8f97"
  },
  {
    "url": "assets/js/5.bbfaf8de.js",
    "revision": "97c6f85861396952fa3ae654335c459a"
  },
  {
    "url": "assets/js/6.78cbb24d.js",
    "revision": "5ae2d044d3baaefe9d1956914d57ea9c"
  },
  {
    "url": "assets/js/7.c601a0f3.js",
    "revision": "730ac9d0600f5aab0a76129b605b3a33"
  },
  {
    "url": "assets/js/8.4d6b7ce8.js",
    "revision": "9367897d280e8f20c53543d45959b78d"
  },
  {
    "url": "assets/js/9.a0b475e9.js",
    "revision": "b1a2e65b9f0ca10efced00a0ee68cc49"
  },
  {
    "url": "assets/js/app.e0b7de47.js",
    "revision": "ef6d71c494bf9213acdf1f60ee38393c"
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
    "revision": "9e9bc9348ad2729ea7d2aedf5dd2de88"
  },
  {
    "url": "categories/index.html",
    "revision": "c6f4791e454fe9de453ccca40e3ee5d6"
  },
  {
    "url": "categories/java/index.html",
    "revision": "887b5d25182c294ef51e528171f15ef0"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "923fb2dcca02225b75d8c549edab3e2b"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "9805590fee86f4a7abfda56d6774c297"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "22f1b4201ecb925996f2c8deedf60c7f"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "4072b5f57b44bd22fbf7a1d9955f1953"
  },
  {
    "url": "hero_white.png",
    "revision": "5c707c6a6f8be5e1b6d767c83cedc8d5"
  },
  {
    "url": "img/5.jpg",
    "revision": "c48683b7627396b02eb4a7df386431f5"
  },
  {
    "url": "img/kbjw2.jpg",
    "revision": "78b0701cb66d42de9a6eaa6b0ff38ece"
  },
  {
    "url": "img/logo.png",
    "revision": "c64aaf8d7c93f74291da23d1ebbbadf9"
  },
  {
    "url": "img/sidebar_280140.png",
    "revision": "30e2bf90705fc32e783f29a833736c17"
  },
  {
    "url": "img/sidebar_2801401.png",
    "revision": "0c2331a84c22028e9d50010be4c9b71f"
  },
  {
    "url": "img/sidebar_28014022.png",
    "revision": "67ed912a57fe22a89c7ef25bfa3d6c74"
  },
  {
    "url": "index.html",
    "revision": "0b83152a5c24673b1d92ec9d2c6c13f0"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "723a9db980a8be35cdb9319b2ae06621"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "4c26bcef3d2977e5ee77ecb9c3da6fc6"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "0bc8f2124a77615bca097ddbf2ef9624"
  },
  {
    "url": "tags/js/index.html",
    "revision": "5e908e70fcc945cf0bf601412bcc1ba5"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "5e27b0a1d0df024cde56f83483ff9a7c"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "96b865264e06ebdc246d97c7c9ccdd3c"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "8022d417c9c87b5599b74f82f27c352d"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "54b2e4333eff6b23c16c29c5c122a310"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "2e31485fae2667ac7ece68dcd51dcf98"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "616646dab9d7e5ffff23c9db0c3e790d"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "ae16446e69473ee0de0852ef254dedcf"
  },
  {
    "url": "timeline/index.html",
    "revision": "8e07f39171b758773bcb85627a0a96f6"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "92103a2eae02b0ea00a6c4a421c67938"
  },
  {
    "url": "开发技术/index.html",
    "revision": "ebbc9d5f752d21ad5c96ada01d92ccf4"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "a15c49806c5e98d0347e100889e7d523"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "ae0b52eedba16652e41466b595a0cb05"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "71e771d763e57806987939cdc33ff89c"
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
