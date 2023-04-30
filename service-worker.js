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
    "revision": "68e5f56fba94fb3cc97184196fafc803"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "45ab306989f87ff126709b1592fc8cf5"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "87e18638ae34526346eaa836941dfe69"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "cba96fd6f1438a3a7c31812e72fcc64f"
  },
  {
    "url": "assets/css/0.styles.185cf5f0.css",
    "revision": "76573b88f87aba5e396f46028189a24a"
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
    "url": "assets/js/1.f5d79b1d.js",
    "revision": "80e874d935fa04ef0a3cf70f0f0b5935"
  },
  {
    "url": "assets/js/10.1d0f0de1.js",
    "revision": "ef94cc803ebc40261e52411ee791ea8b"
  },
  {
    "url": "assets/js/11.64063374.js",
    "revision": "1ac88ba93d9e7b095b3f4bc9f941d1da"
  },
  {
    "url": "assets/js/12.911f7b7f.js",
    "revision": "e83bd974fc3263aa2e7cc6502b005f36"
  },
  {
    "url": "assets/js/13.f5ff52c2.js",
    "revision": "55a82e15b29f97843118100d37f1bd6d"
  },
  {
    "url": "assets/js/14.11600538.js",
    "revision": "875325f852f926669564decac61d4179"
  },
  {
    "url": "assets/js/15.5ca67145.js",
    "revision": "00b61f1e18ed856e3bbecc5b5366974b"
  },
  {
    "url": "assets/js/16.e1cbead6.js",
    "revision": "4a997f177aa4b160750e5b1ac39985fd"
  },
  {
    "url": "assets/js/17.dd1e23db.js",
    "revision": "89c2b59a354f17d98fbbb58fd85df627"
  },
  {
    "url": "assets/js/18.8780daee.js",
    "revision": "8f2e18b239f8ffd0ccd8b1157ee1bace"
  },
  {
    "url": "assets/js/19.d0425a20.js",
    "revision": "a6625dcf95c6d544976ce49afff1c139"
  },
  {
    "url": "assets/js/20.e3203479.js",
    "revision": "398df5418904452695c98e0a36eab188"
  },
  {
    "url": "assets/js/4.adeb82d3.js",
    "revision": "b4c88071ad794d2fdfe6a986786da50c"
  },
  {
    "url": "assets/js/5.686619ab.js",
    "revision": "0f03a68c9b1006612b585e4df9a6268d"
  },
  {
    "url": "assets/js/6.a0052a5d.js",
    "revision": "979d0d3bd2b840c2773f59eea3006514"
  },
  {
    "url": "assets/js/7.006f19aa.js",
    "revision": "eaace22cf05cd495f8106524865439fe"
  },
  {
    "url": "assets/js/8.ae1308e6.js",
    "revision": "2c305f1ecf72e48dfe1e525a0ba81e8c"
  },
  {
    "url": "assets/js/9.96287f03.js",
    "revision": "852f9e48623b77551bb3b389d9abbb6b"
  },
  {
    "url": "assets/js/app.2a760fc8.js",
    "revision": "8a93bbdd5c7c2877dfb09819b1e1502e"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.5219aedb.js",
    "revision": "60a80145760e8c7455288fc9ce5453a7"
  },
  {
    "url": "avatar.png",
    "revision": "8438da67128634169acc28c53e2ca388"
  },
  {
    "url": "categories/AI开发/index.html",
    "revision": "3322009f587eab2fcd703b8c8ca94a53"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "ac6ef0bb6fa97f981d490fab1c520578"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "c9ae70f59280455acb415d3bd779f8c3"
  },
  {
    "url": "categories/index.html",
    "revision": "6e57ac37425531c1332de2eaac20579e"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "14c31441282c13843b3dff2e91c0b73b"
  },
  {
    "url": "categories/TensorFlow/index.html",
    "revision": "3dad00cafc55968325e9a64cb00d067d"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "d35e0f1ab4efb3fe1846d18c6453f3ce"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "8ca28f9de262177531dd404600c7aeeb"
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
    "revision": "94d1cd123a2c15ba110d07fd0f135695"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "60f436a94a72d38a484dd36befb36388"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "127712d2ce4f2af46c4badfdfb1eba3d"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "37a545f7cbe150d7c776a1768b780bd5"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "6170b1f84eea291bb414a4ccc56f0283"
  },
  {
    "url": "tags/js/index.html",
    "revision": "029d8df0ce8b5018ab5e5ab6df8ae998"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "2829b629af89f926fcc1fcd52f33d728"
  },
  {
    "url": "tags/Python/index.html",
    "revision": "2288cede968ff3d33e71618d5c18c9a2"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "fc4b8040fdf108910099f28bbbd375d0"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "5dc5d8af2c9922cd612d110527f22856"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "0e39e05e5dbd1d8a177d2f3aa0236408"
  },
  {
    "url": "timeline/index.html",
    "revision": "792d6801020d9f35d77b2ab86e42c3b7"
  },
  {
    "url": "学有所思/life.html",
    "revision": "0a68cf46987416537b0f09d17009fc89"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "74ae77cdd823adc3ecaaf3e7e804d3f9"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "97eaa668125704dc333d99c0c914f2ef"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "91fba278851b70002924d599d3aeb241"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "6ecb81576b587e746c1c1dfda6325807"
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
