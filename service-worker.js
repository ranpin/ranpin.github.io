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
    "revision": "4d51c86192a933e14625e5cfdbb2d65d"
  },
  {
    "url": "AI技术/index.html",
    "revision": "bf32083236e52966e4c694d3d6ed2a2b"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "495f6c4bf153a08f2b7566b262c653fa"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "077e82caef63e8dba2acde052b2a88ba"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "aa65f6fbe567f9d16e6f4a2067b3e0bd"
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
    "url": "assets/js/12.783e5772.js",
    "revision": "99fd8adeb881b20d302d869ff1d5e35d"
  },
  {
    "url": "assets/js/13.ddab6165.js",
    "revision": "fbb5be6c24df96dd7068f44ec9757107"
  },
  {
    "url": "assets/js/14.c34cf664.js",
    "revision": "72f876d87fa57025343c952977becfb8"
  },
  {
    "url": "assets/js/15.df124822.js",
    "revision": "de2e45ea4bf593ecfe385daff63a5160"
  },
  {
    "url": "assets/js/16.d528eda2.js",
    "revision": "0f03bfdd4ab4119af6c36132fca20ffb"
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
    "url": "assets/js/20.101e8566.js",
    "revision": "51490c0c5822c4492df518a863ab5817"
  },
  {
    "url": "assets/js/21.33111d53.js",
    "revision": "bb8f20f60912fad76644016eecc1d42c"
  },
  {
    "url": "assets/js/22.21b46086.js",
    "revision": "99d7b1df2b2b63f571b30fbc787122de"
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
    "url": "assets/js/app.f5531b3d.js",
    "revision": "8a3f6774fec0face78b95d2ef807ec25"
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
    "revision": "7bd463a3cb305d5eaabe034555cc312f"
  },
  {
    "url": "categories/java/index.html",
    "revision": "56d751b732f0cafca6da512d58b1d762"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "dfa389ae9091376052e1d074486b728a"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "3073ce4b9e3f793117445e49bff4131e"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "ee03aa2d7725cdb81b9ae9cf70951269"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "c9957f2041280cce019814eb0951f3ce"
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
    "revision": "d4194580db71545336fbc4b34a2c21e2"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "18ee4c3ee6fd929283a759815f781102"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "5fac6720e6eaf388d8751ff94e353eed"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "898d6d5014bcddcdf08338c4ed041635"
  },
  {
    "url": "tags/js/index.html",
    "revision": "8d80513dd6289f589fd555e0ddd2b1f2"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "46561071fa8a9ffaf87322fb6acf067d"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "14fbb2b7e15f739d62838f8809b7c03d"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "bd8d97b590a6cde36fe6ed0b7a4f753c"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "0e987087e9d39dbadc9b5b71b5c524d5"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "93bb84dec10b7e6937b4e79e339283c3"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "3563d76ce0d6bc8fed0255d3b8ab20c4"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "682bc461f1cbab03d90570a1aa3a853f"
  },
  {
    "url": "timeline/index.html",
    "revision": "30c006edb2e91beebe5cb9fbb0ddf447"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "学有所思/life.html",
    "revision": "c6fcc6390b3f69505391bdb414fb7bc1"
  },
  {
    "url": "开发技术/index.html",
    "revision": "b41261b6cebd2ffdef7a04bd9ec2a18e"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "ca4178e3f03e743278ec3af979592545"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "d05785f519150f7c50aad584df2a0426"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "68e19375b534e226a2d79f00590e9675"
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
