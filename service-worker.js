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
    "revision": "b1a5fc6f80e7457058fb83816eb7dace"
  },
  {
    "url": "AI技术/index.html",
    "revision": "17363c72049c8db6fe79c13cc9c09eb5"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "c451d83db208176aeb1f6414b80584e2"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "d4da0f8d38426a7c1585026a9ee380d3"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "19378b84323c641fa2ea46842670752f"
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
    "url": "assets/js/16.7f8de966.js",
    "revision": "1fb716ad281fb66e8588cbd71e610f1d"
  },
  {
    "url": "assets/js/17.1e322fd9.js",
    "revision": "e0278d397bbe7630a6d502bbe9376ac4"
  },
  {
    "url": "assets/js/18.cb6d75f1.js",
    "revision": "afd891cd7e4aa91412e4272ef6beb43f"
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
    "url": "assets/js/app.7194ab2f.js",
    "revision": "3b245b5931d0c17febb2bfd28316df3d"
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
    "revision": "4faee7cccbb7c37d88ab02da6565d659"
  },
  {
    "url": "categories/java/index.html",
    "revision": "1eecc8a9eafda1f281e96dbc0817aedd"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "1014d7e2032af1647659680c9d4a0fdf"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "82d5e11f8bbd5c37748f86bc528d7a3b"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "3d6f582dfb9847897a4431095e8f09a6"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "32672066eb2b4c1222b475306cdd39ef"
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
    "revision": "a40bbb8e23a7a48c1aafc7cd808900b9"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "069c6c1ab351a31d3db695d3eb469146"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "bf99256fa5ee41849a30d99293da059c"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "fffff7d5d6ff970f0c34e69e6f53a3bc"
  },
  {
    "url": "tags/js/index.html",
    "revision": "5a225346a6e113d573f077c4f5f40565"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "18da9a183df823bc387fa692412f3978"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "5b2b9c31eb028d0b5eb8e1886c438c63"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "24c0d1e4b5a0b61c596298be499eb9f4"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "a851354a7f5ecfbcc90b3700b6fd7da8"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "aad1faca31d02a1e52820ed523edd20f"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "db09db7e4d18db75bf408425f8c61f62"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "c778b23925b7cfad14ea4494ca36babc"
  },
  {
    "url": "timeline/index.html",
    "revision": "9a7f264e095a639e3c41f02e253396a2"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "9f8816a2b6b2a9d5fc9f713d403519b7"
  },
  {
    "url": "开发技术/index.html",
    "revision": "74570a9ac701ead3116149095feb8152"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "b17814caa3313121ba28f757e27a1669"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "2eb14c32746e8ab4940d3af1b9b25093"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "53953face4748a9b43d2eedb26ef441d"
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
