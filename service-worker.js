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
    "revision": "585f61329abee655eb6a76e4188d5563"
  },
  {
    "url": "AI技术/index.html",
    "revision": "92f73db93f8d047b604563613589959a"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "e236c978cb5d5771bef46e0351776ef9"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "ba14adfb58e7a0a38141d0b6edc0a789"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "1f3caa64f7b078ed7020f39e5c5cb37b"
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
    "url": "assets/js/15.142da642.js",
    "revision": "63759923d825905efc843be6c6b45132"
  },
  {
    "url": "assets/js/16.d528eda2.js",
    "revision": "0f03bfdd4ab4119af6c36132fca20ffb"
  },
  {
    "url": "assets/js/17.bcbf0994.js",
    "revision": "3e89dc15b1a3c3ff9fdea655c0d1e25f"
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
    "url": "assets/js/21.f877cb0e.js",
    "revision": "cc8e70263a33c7fd6f350b93e09fd869"
  },
  {
    "url": "assets/js/22.ef3167e0.js",
    "revision": "e7ee10546be0e6c5e593003ff5a34d53"
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
    "url": "assets/js/app.e62f42a0.js",
    "revision": "0c8eda3ee67a9555d7626bb5a2ed2aa6"
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
    "revision": "9dedf82cf1c0b82e1d28f6f980d9afe0"
  },
  {
    "url": "categories/java/index.html",
    "revision": "9a514c72fcec57b0055ac09c4bc73143"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "b581b879ac474fc28727af202336d924"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "94c898bd3867f23bfeffa3546362d90e"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "7fb0c18acec4d103fc803e6d977a8224"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "21681a84ee0f50c77a117970689a4df9"
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
    "revision": "2033b37d289bfa276c93e0b016499d80"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "8900d6b3b9da2e2fab49b0d74193d042"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "7ba670340fcbd89506cb4f9cf0697ad2"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "8fe250b175fa57381c8987463f5a0b57"
  },
  {
    "url": "tags/js/index.html",
    "revision": "e9eae83c23b2f4fdd2dfbc98b452a7be"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "bc43906289b1fc91a56a6254fc6317b7"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "a64be08bafb3199d01b9c16a4091c69c"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "3362f8087098c30f20a0468849bca57d"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "b139250e8865f8302307056085490b14"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "70fc31a5345c09864f7cbd082dde8a4f"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "c9b3069b2f5946658e807fe8fb50d8e4"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "3827632f85b311722e9616efd97a3a17"
  },
  {
    "url": "timeline/index.html",
    "revision": "f665b7392dc1b6739545986667737ae5"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "ba268e8fb2b58b4f4afb76bd748bc393"
  },
  {
    "url": "开发技术/index.html",
    "revision": "ab96256f936a93850750f615f52ce7a0"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "611bf7f2c4abe79361343822f95882aa"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "8add61a30b40e956cd4b5420db5eecd2"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "e7df2b9a82518643a9f3078145a3a719"
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
