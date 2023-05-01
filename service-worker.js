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
    "revision": "6402770355452c16e0d91f3f087e0731"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "10d69c171278ba299c2e741d6eace053"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "dfcaeca4a01aeff6ec46464dc67cb819"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "9f7c25d81bc9b4e4edd44c8520db9b61"
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
    "url": "assets/js/15.a377aac0.js",
    "revision": "38be1d7d3247e0e1a6c108d078a3429f"
  },
  {
    "url": "assets/js/16.6c143f20.js",
    "revision": "7f5536fb1546b33b6b9d671e24dd20ba"
  },
  {
    "url": "assets/js/17.179982f8.js",
    "revision": "1c2ed1849baf75ecdad17535372f2fa6"
  },
  {
    "url": "assets/js/18.82fbcdc2.js",
    "revision": "31381a102c03fbd04bc49c2be7e8176b"
  },
  {
    "url": "assets/js/19.f1028047.js",
    "revision": "69ccf96a81519e11f0bf4ee9e7115171"
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
    "url": "assets/js/app.d39072af.js",
    "revision": "4c08c0ef393c24549e1b82efa8b960a9"
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
    "revision": "06fc5d1748c2376f9e9982f76430c75e"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "0b5fdeb7a3dade7673ac1bdc7663aecb"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "bbfbd5c18b6752ce48cc592a03842015"
  },
  {
    "url": "categories/index.html",
    "revision": "6250e30919df171b69843dba0ff6a720"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "226781343b77897265e24b5469f7cb2b"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "b30185fe41ab50067cd79a5feb939dcd"
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
    "revision": "471d0ad919cefc545721ec7afb4a2d9f"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "147e7ce81d152e537829ac6feb81ae57"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "74b5248902e01d90d4dc60e58a8cc7b2"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "ce0be9831e28e1d65738f9cfdfdc8eb1"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "222131786c647f23b04d90e1a751cd01"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "b08acb5a7aca53135f773ae2fe472007"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "527d8554b275b0a9a1f3e5318715bb24"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "d6ee1c98df3f6d5246220543d465a900"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "aac76c2d20f4c257531a0c3e2512a4dc"
  },
  {
    "url": "timeline/index.html",
    "revision": "0fa3a19c258c2d04ee380a37a164f1ef"
  },
  {
    "url": "学有所思/life.html",
    "revision": "9592a8b85c1356d1a86a92dfbb4148cd"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "4b4e7799cc8f54b2a0721546a35a4a20"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "fd0023e9e8fb63098e96dec8c882b1dc"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "6f665d5f4d4165468e9614b474da7b42"
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
