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
    "revision": "b0a4c846065e9073c8b9ebdc54bb3cf0"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "9c3f062f804faebed57fc6c1bd086ba8"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "4dfe49760d721967154cd1319fbf0468"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "4cf3aa398b5e059fa35f693373f0a7d6"
  },
  {
    "url": "assets/css/0.styles.449bfb42.css",
    "revision": "8734d6de1153c355ab64f0b64d815ca8"
  },
  {
    "url": "assets/img/20200410142716143.fc697436.png",
    "revision": "fc697436b59276a03ca0759acb08ecec"
  },
  {
    "url": "assets/img/20200410144536428.2275a447.png",
    "revision": "2275a44763ec2a2f0abd45e72f03a38c"
  },
  {
    "url": "assets/img/20200410145104392.71521247.png",
    "revision": "71521247dfe67fd2ecbf0610659c9a22"
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
    "url": "assets/js/10.4718b7c7.js",
    "revision": "0fc3b39bc8cae4aa6a817014082cd288"
  },
  {
    "url": "assets/js/11.7b0a13ab.js",
    "revision": "bc260310d43df1ddeffc58847f4874dd"
  },
  {
    "url": "assets/js/12.6c9b04e7.js",
    "revision": "b1c5f5ffeed34fa975751887da376305"
  },
  {
    "url": "assets/js/13.b5982cc7.js",
    "revision": "7d2252f549fb7f4c23bff6cbcbaa69db"
  },
  {
    "url": "assets/js/14.f97dbf49.js",
    "revision": "350bdd066e3fe43872fd592825192985"
  },
  {
    "url": "assets/js/15.a377aac0.js",
    "revision": "38be1d7d3247e0e1a6c108d078a3429f"
  },
  {
    "url": "assets/js/16.93b6d6d6.js",
    "revision": "b80a19d92f6ab71ce4e17db989a8e198"
  },
  {
    "url": "assets/js/17.8668927c.js",
    "revision": "adbc324ad8897da2079f8b7d791e8f57"
  },
  {
    "url": "assets/js/18.97c4ab76.js",
    "revision": "93345c168cf0ba0a577aa4ca571d30e1"
  },
  {
    "url": "assets/js/19.20e617e0.js",
    "revision": "62d698f59e989058f563eafe7f7bac16"
  },
  {
    "url": "assets/js/4.49267b0f.js",
    "revision": "6e0f16651da2451511fb1ed35bb8a24e"
  },
  {
    "url": "assets/js/5.ad3a0b78.js",
    "revision": "a742aa39bd752b536c9e70cd59ed3d96"
  },
  {
    "url": "assets/js/6.047963fa.js",
    "revision": "4af7d7c442dc340fe464c9ae399ecd35"
  },
  {
    "url": "assets/js/7.7ad5eaa9.js",
    "revision": "910791bc64c9143b8b516a74e13a9c9d"
  },
  {
    "url": "assets/js/8.0df95e42.js",
    "revision": "7b66c56451ea37916024f833f6742949"
  },
  {
    "url": "assets/js/9.31d4383a.js",
    "revision": "ecfc1d92d0bb051358d288f8278c0ccf"
  },
  {
    "url": "assets/js/app.6d6c2b48.js",
    "revision": "3bdf47fb117d2ec3174ede966150dffc"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.71fcbd65.js",
    "revision": "0eab17abe41a30ca22cc6fcf087b2eee"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/AI开发/index.html",
    "revision": "c8dc510f444cd7d9401e3c5c4852eb6e"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "06cc0baa734709af0f36d937ddce9e5e"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "c3a36efa8c1750e8ef62a1e0675e7ab2"
  },
  {
    "url": "categories/index.html",
    "revision": "50a80e4840fba569b30b2b4df6dc11e6"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "923757f9e411baba5a2af27ae5e7b6eb"
  },
  {
    "url": "categories/Python/index.html",
    "revision": "a392db787d0d61e7e172ff642a01f428"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "1e4c3a3507e24ed836bea5540c34a5b6"
  },
  {
    "url": "css/style.css",
    "revision": "4595db127f2f4fa4e8640d7a92ba48e4"
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
    "url": "img/logo.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "index.html",
    "revision": "c75ead13013960df590453f4d8a67146"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "4e45944e0b4b19246879551a9cdb35b3"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "aa5ab62c6273a72b8837ddb13645860a"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "5d2951cc1e1524a621da02e25591fabd"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "5f003f1369640b354d2eff4ac2317116"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "ab40ab4c0984b10f3ce396d68e3546f9"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "fbfdff2d4d1e87a52c3390fc39f8b0eb"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "6661680abbb40fdf7bf4ba8e31bf4df9"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "d9c9ae1f3a5d8c5bc041479976bffa7b"
  },
  {
    "url": "timeline/index.html",
    "revision": "34832e64f6e47f3fd2b22b837a76711e"
  },
  {
    "url": "学有所思/life.html",
    "revision": "162efe5a2b3a58f65f32e4eaeaaf793e"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "4ebd1d2d41c0f2ea084b239cba21dd7f"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "bea77a759b770fdc4364d005a4c9f472"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "0befec8cf554a45ea078b72b848e4519"
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
