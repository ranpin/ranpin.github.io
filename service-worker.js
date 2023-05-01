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
    "revision": "322e1a48aaf1ad3515c2fbdfc54d536a"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "830bf4bbc7ab15c85fc1fe2c1bab8688"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "40567d9280637551a4cc49090b5747ac"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "42d4813b6c8ea88ef096fdd320bdd423"
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
    "url": "assets/js/15.ef291153.js",
    "revision": "2261337d7179e3aa40811fbcfd30b35b"
  },
  {
    "url": "assets/js/16.524c169a.js",
    "revision": "972bf1dd8e77492b428b43c36f684bb2"
  },
  {
    "url": "assets/js/17.81685d68.js",
    "revision": "36581af4600d7435dd84191ee866c9ff"
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
    "url": "assets/js/app.85933cf9.js",
    "revision": "94ea738beb2a0086a162886e821daa75"
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
    "revision": "f44ca0466c3360ccb18b6334c67b17b3"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "ad93749dc2e80e0b691ba527d435e549"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "7e4cd74efc8fc4a8a26db01d4a9bb69f"
  },
  {
    "url": "categories/index.html",
    "revision": "a2df11cc1066348983d6a04dff220955"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "d4f051193bc2fa15c9160a047b8af6a8"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "74dfebacbc119e0eb9c69cfdb22cc07a"
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
    "revision": "0e538c5c4611318856835b9bd4b1b02e"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "ccfd316ed8f9f5e37a9d91f4a0625bc9"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "f78c81118deca60813d7d64c9ca11160"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "7676c1faad7be9357c91c07710a8afe5"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "6bf6054e5eca7b2dada6bb86f047bf47"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "4d51ac521a25403265f6c603013afe7e"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "9273845c0bb37536011edc2ec2b8f98e"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "269109ea0aaddd276467d638d7c66d32"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "2bad9d4e70806bd77df3b4c099dc21e1"
  },
  {
    "url": "timeline/index.html",
    "revision": "87e239e5b4db328e7748e8a4a4126b7c"
  },
  {
    "url": "学有所思/life.html",
    "revision": "708586968ac3291645aa175ea54c0b24"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "9f01ffe094bfd0b35378e0502674b24c"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "7dd6e5b58ad2c63e48681155667e4565"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "1bf9f4fff2befbb2c306f611daa6f705"
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
