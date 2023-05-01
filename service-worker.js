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
    "revision": "f27d63c874681a938b3cbba9a2f4e43b"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "0e74c6a5d73312c1b8d27df39d8c0814"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "8fd1d069e2b4893080c1c978da7174e4"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "50ab3f0f565674fad73725b401f2640e"
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
    "url": "assets/js/10.1a11b2c4.js",
    "revision": "36ef3130fb7e080a6f632860d933a176"
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
    "url": "assets/js/15.72af59ae.js",
    "revision": "17a78912ca7fd4598be43400142296b2"
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
    "url": "assets/js/18.49c08653.js",
    "revision": "af86e6ec5b600b619895b5ea7e17abc7"
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
    "url": "assets/js/app.9900f91b.js",
    "revision": "396b3d4fa0a12f45ca5b3a52619136ad"
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
    "revision": "b6c3d3bd31ae96864fdcb78d0555b9cf"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "f87b6daa1e9c7a18126cefaf6c954898"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "64b0bbfce167e91483d378725392ed6e"
  },
  {
    "url": "categories/index.html",
    "revision": "298acbc4faa890195c215b3685db1a1b"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "f9c16ac4f780d598deb4f137b6cb6686"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "3c009704c02ac5ec41bdc6531133509c"
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
    "revision": "26d387882e3e629a027360097fef4534"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "a8498ea7bbdc204dad4dcf1057d42658"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "35bb86d8bd662fcdeabbd0769c4385cf"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "3c60a3655e15a18fa3dc673b0baf5a02"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "313cfa63ff15dd691fd1aca4faa93c6f"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "bd3f91c90eb6f0001f53fc9c62bd0c4d"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "a37aba46f137861d018c8557a8e7850d"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "f0b25c157d4c8a3a1c1b7e417c190d5f"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "a1f8bc2d3a679e1374676b11368cb50f"
  },
  {
    "url": "timeline/index.html",
    "revision": "857cc4453ecba83288f2de0d93541eef"
  },
  {
    "url": "学有所思/life.html",
    "revision": "e9e76d6a95902f84877372f94b8c95d3"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "d5f3c4db0306b3c51d129fb0c840c420"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "c6cf747ae0a5d2f013bea89a22ee0e04"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "08f3e3e95d1832b051857308ea701db4"
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
