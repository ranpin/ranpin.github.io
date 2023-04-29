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
    "revision": "1a0fe9d74258ee38f74f0a09ba9e5ba7"
  },
  {
    "url": "AI技术/index.html",
    "revision": "0eed7822306b4213b73cbbd7a7897e85"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "0ad8ff5a6aa5b325aacd00632e3e4af3"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "9ea4e659d7b3c008cf1cdcf98ef35ee6"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "adaf529b46aa4bef40dea0b630e5fe72"
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
    "url": "assets/js/16.ff743bcb.js",
    "revision": "f7f748a9787b566e9bae592410b8d482"
  },
  {
    "url": "assets/js/17.8e4f6593.js",
    "revision": "b8425cbb31d49d8e1a7b63d6cd00c457"
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
    "url": "assets/js/app.f28384e2.js",
    "revision": "3c04d4ed1ec47f4c3b5dfcd5771c3c83"
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
    "revision": "585e0a4491d1e14fd40c9d84dfe2718a"
  },
  {
    "url": "categories/java/index.html",
    "revision": "4382be19908476043ae1b306785c247e"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "9b0741b522ad17fad3f4a5a90c5b6f76"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "543405f9b6110927838b7a920d9f00eb"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "b00637eaa9d8836f4a0ba9562c384f4b"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "65f941a9f17e62c3d38721be1223f543"
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
    "revision": "b42aae31f9cdb66aec4515863ce6349b"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "e9010477e5e76d7e673a4f225dceb53c"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "e8f097bc467815adb8e25f1ea4ba7b2d"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "06111a92702af2fa86f07906c5870417"
  },
  {
    "url": "tags/js/index.html",
    "revision": "744252acdd7217a19eee32ed78b92aa0"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "e50295c260f2c8f8359054fa36670567"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "037acfa0148637750e68938606c406d6"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "84cc30ff2184c7a383444d45ef597244"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "0e583b6ad1e4fe171a48efff9dbf0f42"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "c5e046d4dd0ad5f2aed98db187410fb9"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "e62a62347796c5a9ed804767e7fa017a"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "ea61769c2e676d0c8dfdeb2e349a50ea"
  },
  {
    "url": "timeline/index.html",
    "revision": "4c6687fa52a8d466b396da397916a649"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "9fa80e1f07b59a0eb0a4693fa2fed2f1"
  },
  {
    "url": "开发技术/index.html",
    "revision": "16d35f76be593e372b2c3ffee88406c1"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "eb234fa49e5374e12a20ce2cc5a840d2"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "dc4612301fc34dc6656c7bfb9968bdbd"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "3c8146fbe9339715be1460cbef7a145b"
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
