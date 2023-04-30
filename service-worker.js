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
    "revision": "ad1912907258c6a0bb6796db7cd0d14b"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "a61469691b39b7a3c2033d9fe5c2b0d4"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "6afc8b777b659b78562b5204d7e3df63"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "ec6bf445a90ac6c655e8bd6ec249785b"
  },
  {
    "url": "assets/css/0.styles.185cf5f0.css",
    "revision": "76573b88f87aba5e396f46028189a24a"
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
    "url": "assets/js/1.f9445522.js",
    "revision": "ffb7b3522ff7156d327ccd1d0eb7f4e1"
  },
  {
    "url": "assets/js/10.7e9f8a75.js",
    "revision": "c244146f0cee0728e8eede93bb67d5fc"
  },
  {
    "url": "assets/js/11.e7365fbf.js",
    "revision": "f207c19fc22b54daa6811f8e4011e472"
  },
  {
    "url": "assets/js/12.129291ae.js",
    "revision": "4413291e5189ab39647e678eb1ff54ed"
  },
  {
    "url": "assets/js/13.591ba1b0.js",
    "revision": "8c8e899700952753c12d540871165823"
  },
  {
    "url": "assets/js/14.27d5ab08.js",
    "revision": "26455924bdb9b54d05b397104e348d94"
  },
  {
    "url": "assets/js/15.f038364c.js",
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
    "url": "assets/js/18.ce5c86f7.js",
    "revision": "5f32a9b93771e07919ad8a6d596eccdd"
  },
  {
    "url": "assets/js/19.92d37048.js",
    "revision": "35b46f6e12dc0795c5cd6df831571834"
  },
  {
    "url": "assets/js/20.5469bd55.js",
    "revision": "9c190ce8fb331dec23f2e1527c316287"
  },
  {
    "url": "assets/js/4.c6d155d6.js",
    "revision": "63582b505de3fd0cfdd86d6b9207408b"
  },
  {
    "url": "assets/js/5.71c145d5.js",
    "revision": "a61b0b202a97c7a88f19b47e113e748d"
  },
  {
    "url": "assets/js/6.fac33249.js",
    "revision": "944f043202085790c03a54bec6cae8db"
  },
  {
    "url": "assets/js/7.528891f9.js",
    "revision": "ad25742290c1c07d32c25666172b8d57"
  },
  {
    "url": "assets/js/8.b87169f2.js",
    "revision": "034d67f0ac77fb9a657b9d99ca901bdd"
  },
  {
    "url": "assets/js/9.fd1c866e.js",
    "revision": "4247e258a44165e10104eb326e3c0c99"
  },
  {
    "url": "assets/js/app.5c922699.js",
    "revision": "3093fd841c7611b172d1d9328f4ba8da"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.92740f13.js",
    "revision": "73b863921d49e9222a4278a3cad7f4da"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "367149619feacbced305af9ba3f3680d"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "0f22888e8f1a051b070527a6d3f90ade"
  },
  {
    "url": "categories/index.html",
    "revision": "99b0adb5ec9b358aa73dd84cdc6d698a"
  },
  {
    "url": "categories/java/index.html",
    "revision": "e786f12568d7e7a4776255b1f2da45d9"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "820749ab832cb0544a1114f807c1b494"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "6f3690a1e67e89a8f8f47f844414cfa0"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "50637fdb0842e3798afc3c31ea46f536"
  },
  {
    "url": "css/style.css",
    "revision": "b9634487d96bc3287f8f3ed47f003830"
  },
  {
    "url": "hero_white.png",
    "revision": "5c707c6a6f8be5e1b6d767c83cedc8d5"
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
    "url": "img/kbjw2.jpg",
    "revision": "78b0701cb66d42de9a6eaa6b0ff38ece"
  },
  {
    "url": "img/logo.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "index.html",
    "revision": "d15d2773b0703ce89cd18e5cf63608a7"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "7d7e3728ee30e23b827c9ae2e5ef18de"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "c36ae17f1a92f06d5468323a42a1d3df"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "8353d8d708d97a750a5af64a8279f8e7"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "223582f36c5aa4fe3eb16e4d6e336f62"
  },
  {
    "url": "tags/js/index.html",
    "revision": "4132d478b5e0d2e25ae2eeee0275500e"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "91c5ee960193ac6fac17256fdf4c5e3c"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "21649e3ddbb039bf9c83c74e85bb7952"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "6af0fb8fc7ad924cb97ca2307ec7bc38"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "f715c22bea14d3686cc1bb669280b037"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "0776abedd7817188d7af8d9be56d5cff"
  },
  {
    "url": "timeline/index.html",
    "revision": "7ad79402805ff96a4a06644176819d58"
  },
  {
    "url": "学有所思/life.html",
    "revision": "bcedc40e66d816e28ba9674689160b84"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "4384c794d32e3e18f9c9427af9022877"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "d6de0e056c6ae0aa792a9b4ef702cb15"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "1c9a07fc57c14da64033b9df019a58f2"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "f845987a54029525ce7a8228e616c5b4"
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
