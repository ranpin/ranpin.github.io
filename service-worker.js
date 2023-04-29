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
    "revision": "b82a598e4ad3e691c5a99f79837562cc"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "0979d7f2a8b70b7af5c5eb2e50404a30"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "1716c46fd8825ee5965ed463d75de49b"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "e093c2f120cedc64d40a7a2e473b89fa"
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
    "url": "assets/js/15.44903e4d.js",
    "revision": "38be1d7d3247e0e1a6c108d078a3429f"
  },
  {
    "url": "assets/js/16.ae65eca5.js",
    "revision": "c66f57eada99ef1bd6715ce86ab56fab"
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
    "url": "assets/js/20.200e2808.js",
    "revision": "40d1cb60a51107274d9c1a5f22bb11aa"
  },
  {
    "url": "assets/js/21.cf676efe.js",
    "revision": "9e88d5ad77b342d8f1f055eb53205c79"
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
    "url": "assets/js/app.1385a5b3.js",
    "revision": "1083e3805d03985b67f5254249e20236"
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
    "revision": "dd869b4227642896703ec3ce4ced8b2f"
  },
  {
    "url": "categories/java/index.html",
    "revision": "0bc6b541afa1b217c7cbada70f68dbd0"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "60dad036a7f270527ffbecf05c7cbd42"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "fd739e4e9915512aca19295a38428df8"
  },
  {
    "url": "css/style.css",
    "revision": "b2d91d2608e5d55a27e4cd32683fc580"
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
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "index.html",
    "revision": "3718719fd2a01e75d8028a3955495cfb"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "a8507f626c57d1220152c41e08863587"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "014812b708182aa060fdfbfc7d2ffd80"
  },
  {
    "url": "tags/js/index.html",
    "revision": "166bf285f1d063b381ef374fb7903581"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "9d2c29b7a7be62495e15222cd603eda4"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "de9de4023ce73a0387644ae47d27af68"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "49f6a5367abd7c5736851d6fddaadd31"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "112096f435bf9b8a3fe5b0ad8f8c2b80"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "a7a2372b0a3569812bcaa8cb2db76201"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "1c33036447a506b4ad2c396fd464c186"
  },
  {
    "url": "timeline/index.html",
    "revision": "cd7e7e0f296973b73c9555d644c5c639"
  },
  {
    "url": "学有所思/life.html",
    "revision": "c31415655d8a9d6adf8bce78d509c02a"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "552ed7b21454a53c0c266217c5e098c6"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "1f56a4de45cf603650f0eb3b70219ced"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "8550f664cc5c5309943ed062238c111e"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "6be0e6d47e5988dbfbc90f751c790706"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "82cf2ebe31143c03f0724cedb0656a6d"
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
