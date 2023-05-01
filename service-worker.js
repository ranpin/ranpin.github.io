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
    "revision": "72b066f47853a4fb77f0c4e16825a108"
  },
  {
    "url": "AI学习/BigModel/SAM.html",
    "revision": "9d61fb1a2fa0888b7fd3c26a5fe86c38"
  },
  {
    "url": "AI学习/CV/CV.html",
    "revision": "6f4cdf7d65d2e1c79112320fb77c96be"
  },
  {
    "url": "AI学习/NLP/NLP.html",
    "revision": "02ad85e532a778831d9dc58e82a97483"
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
    "url": "assets/js/18.a4f68908.js",
    "revision": "c79f4008a5dff6116e41fc97a7805641"
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
    "url": "assets/js/app.73b59ac5.js",
    "revision": "fc288b58e6c247919b15891640f500d7"
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
    "revision": "518207072165526744305ee48ec49255"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "deeeb80c45ed30c422e5e01df64cc76b"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "f8fcfd9ae6f3d9f7fb55ebd3364e1e41"
  },
  {
    "url": "categories/index.html",
    "revision": "391266b014dc319b6d4c81e76e669d22"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "cedf28e24add37f46d927c2a7f496bf6"
  },
  {
    "url": "categories/Python/index.html",
    "revision": "d5d90554dd3a30599b37ddef103c321c"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "0586a1b1c1a07cf55d8f9779f8750c8c"
  },
  {
    "url": "css/style.css",
    "revision": "b9634487d96bc3287f8f3ed47f003830"
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
    "revision": "89e69d7b576fa3eb618319b1234d30e2"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "50a2a7672093434421cd696adb83795c"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "08bdf2830b91df6f2ed19389c8777718"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "2e722ef3dfeac42829fe5c123f906c94"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "0b867d89dd1b7d5532489b08d9141669"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "27f39bf2e834852f2243617ce0185d4a"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "ecdbe861d45b9936f5d0804454fdc2d7"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "c95476157c6b796af4a9375af13fb5a0"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "a28105d6db4284ba2a02ab86d80e53a2"
  },
  {
    "url": "timeline/index.html",
    "revision": "fc77c2fab2463cf047651cbef43b7a83"
  },
  {
    "url": "学有所思/life.html",
    "revision": "e55af671498e02f8253ed51b4ad353a0"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "77ca56a71e91ab3da34de951131b0538"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "a947d46ca99e0caddb555af12139edda"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "cc9ea03388e71a3a72857e74534913ac"
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
