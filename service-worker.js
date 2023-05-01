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
    "revision": "e63b07558cecc1e14f8f8e55af21e8a9"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "3ace0d995e65f22c92a6a08aa6eab0a9"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "b7b6f14a43e4e44d83d7c4fb5d54127a"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "c354a04a812c9dc1a837ab1363187ac4"
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
    "url": "assets/js/14.7eb8bd01.js",
    "revision": "f46b145166f718fd4d314b0999fe44df"
  },
  {
    "url": "assets/js/15.fc9d84d1.js",
    "revision": "def76daa4b93f21d04c7c797f7d7853a"
  },
  {
    "url": "assets/js/16.6c143f20.js",
    "revision": "7f5536fb1546b33b6b9d671e24dd20ba"
  },
  {
    "url": "assets/js/17.f98a6227.js",
    "revision": "4b457225223b39353ea51b8872a9380a"
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
    "url": "assets/js/app.b17dcb77.js",
    "revision": "bb21c65e61070937cc0b53c00afe2ed2"
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
    "revision": "5b03c3f75e1f741c13911bafd748e403"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "7e0bccfd247f08bf784c1825432bc7f5"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "516fd42154840dde9f90c4ccdad4798f"
  },
  {
    "url": "categories/index.html",
    "revision": "687481eaa2ca5c6f0dbf90af08e36a3c"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "97a3925171031c1d1c178458e362800b"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "801bef59da6c4a71f949b9928517f006"
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
    "revision": "5f17fa50442f8715ce46e51c0c19f958"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "891eececda62fe66442e917b5561105f"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "44141e7b555a054aa9e031d9d1a1605c"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "cfd2c1924d7b007bcab73ce95d5b48a8"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "a7786627685c9999330622038caf39c7"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "c3cab81e7636626dfe326abe77a19637"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "c68c20e1ab5fb1397ac619578fa823c9"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "d2d091504caf64542fcccc8af3df5e3e"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "c01cc3b9ebf6eb41071662588b504eb7"
  },
  {
    "url": "timeline/index.html",
    "revision": "ac1333a6dcb5902a572d38d625a06d23"
  },
  {
    "url": "学有所思/life.html",
    "revision": "eb3191c1ee0e41050f82168422b23a7f"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "402f9648cf2762a5ae55a36a3e9f1372"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "36d4d2fa339c1949af1d714f09870775"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "e1e25b0f78a31d9c95656a3ff90de47a"
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
