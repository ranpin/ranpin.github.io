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
    "revision": "8a7b305a5a4f000c476c09a0bc89de0d"
  },
  {
    "url": "AI技术/index.html",
    "revision": "993739e8789f1d51fba39c57591a8920"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "924637aa586ab7855cbeba0b2361c01d"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "471725aa78eec518673c1ac551a15fdf"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "aa0f97ee584e001c52bbbbc09a6f2c1e"
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
    "url": "assets/js/app.514a3379.js",
    "revision": "10ec28a112e7e38f36e53887165e0897"
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
    "revision": "16d204851d9792ecdc0dd00df737ae1c"
  },
  {
    "url": "categories/java/index.html",
    "revision": "b6cfde8839a9f89ae83b4786dbb19434"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "68197561d320eb267d94ec43acbdd83b"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "2443b555c65c854afc5df6460e3dd6b8"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "25dffc929f6d976f67ec2e7e839b038d"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "27613a698c71628b689b26688d157316"
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
    "revision": "40a3338c185b2d4f7e917e4f4e6e101b"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "51a195cfb9bbed5bb19cd735ab736519"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "49a9147dc21cd6677212c57d898a1281"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "ef742d1d86d0fac0b135397fdf9d534e"
  },
  {
    "url": "tags/js/index.html",
    "revision": "a99e5979c803f7fd084d57d5cad99e05"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "0313cf7ae8df9a9b0d935c8050d0e7c8"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "1fdb01a650fdbadf2d268d1307b7deb9"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "077fa7644764773b583a6b7299f5a3f9"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "5378d602c445e00900d9753279920ac9"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "e740499a55706e48711279cfb2db6ecf"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "342b1a007522c3cf0c3797fe0a8264f4"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "6be972fef865b2e259ce2e6ebe654798"
  },
  {
    "url": "timeline/index.html",
    "revision": "89dafccfb79a87750b1464b95856abfb"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "7a2a93e2279ae8c4a122369890ccfe1d"
  },
  {
    "url": "开发技术/index.html",
    "revision": "829ff169f547e9b26e15198f2c1939b4"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "3588c1b89151879ce941fedacac56f65"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "92e7ddf8aa665365b14c5cd288111754"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "831de3812877c580b8618752af945f64"
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
