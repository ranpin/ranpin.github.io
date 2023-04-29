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
    "revision": "5c2668841a775bcfa09625db7e13aa24"
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
    "url": "assets/js/10.f90154aa.js",
    "revision": "2d186e0b80e993bf73e697cd6f792bb4"
  },
  {
    "url": "assets/js/11.e8633219.js",
    "revision": "c6b1a8edcabf36b3249cd03c29f993dd"
  },
  {
    "url": "assets/js/12.973b3142.js",
    "revision": "c40b5a1ae79ce713d091b83b378d4fdf"
  },
  {
    "url": "assets/js/13.09880795.js",
    "revision": "6d01bb857e9f6f76f8ce877dcba60b5f"
  },
  {
    "url": "assets/js/14.ea616527.js",
    "revision": "84c18ada04d7f96157697988af640b74"
  },
  {
    "url": "assets/js/15.ed07ff7c.js",
    "revision": "a9267e8b45fc33171454fc7a2266bae5"
  },
  {
    "url": "assets/js/16.1f0e2f0a.js",
    "revision": "77980ee985e85bc7ef25e57e082625c7"
  },
  {
    "url": "assets/js/17.6dca6077.js",
    "revision": "4f5927e7ad60a5ee25788ca5ed00f220"
  },
  {
    "url": "assets/js/18.285cfffd.js",
    "revision": "e5de0936c508067e90878438b7492fa1"
  },
  {
    "url": "assets/js/4.d94921b7.js",
    "revision": "6a9061b507f12ee2770b1f19b8e3d4da"
  },
  {
    "url": "assets/js/5.aafec39e.js",
    "revision": "1689296e32236e06547752a56f9265f6"
  },
  {
    "url": "assets/js/6.fcea16c6.js",
    "revision": "4719502381b5c3d6ac6a2e6d590b4322"
  },
  {
    "url": "assets/js/7.7fcc8b8f.js",
    "revision": "c38484adcb3f89dd39a62f70a7b1ea62"
  },
  {
    "url": "assets/js/8.8dfc7fd6.js",
    "revision": "09cca6c7b2202fa0a4d063836f72e2dd"
  },
  {
    "url": "assets/js/9.e8364819.js",
    "revision": "05c8a35278c075892025e2714a299d64"
  },
  {
    "url": "assets/js/app.a6e7f8a8.js",
    "revision": "40281c5f737348a419704e0e86a88a67"
  },
  {
    "url": "assets/js/baidu.js",
    "revision": "d87b8800faffea165e2a687cbc58c31f"
  },
  {
    "url": "assets/js/vendors~flowchart.6ecfa24c.js",
    "revision": "0914943e5101085e2068a7393195effe"
  },
  {
    "url": "avatar.png",
    "revision": "9e9bc9348ad2729ea7d2aedf5dd2de88"
  },
  {
    "url": "categories/index.html",
    "revision": "68d58b4c3d508e677c1442883177b1f4"
  },
  {
    "url": "categories/java/index.html",
    "revision": "5615e57a2ce52442980e3f06b1fb5ef0"
  },
  {
    "url": "categories/Java基础/index.html",
    "revision": "ae8fc268885f242a527f9edf231d9753"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "ea4bad9f0ab333cc8544378ee04d63d3"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "4e6f531a59ddec6f7f2f56a04d716f79"
  },
  {
    "url": "css/style.css",
    "revision": "0b6bb50460c10cea419bf707274c4cda"
  },
  {
    "url": "guide/index.html",
    "revision": "afa094ba1445320fda120fda746bda63"
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
    "revision": "b35e54e85218c085de994fdcdd7726bf"
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
    "revision": "883577c2ddfda3d2b3d5dc041ade5a0b"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "bd98eff878fdb60e88a42265103319c6"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "aa4224b72e5a4c9961bf719e61459df5"
  },
  {
    "url": "tags/Java基础/index.html",
    "revision": "b835a62859faf0db2fa3f5ff65819a97"
  },
  {
    "url": "tags/js/index.html",
    "revision": "fcde80b1b738e9201c7f605b264fd1b3"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "1d621ab7987e0e452b8dea1326992fc8"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "8e5c73832bc1de5cf29e50c9ca97a17d"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "43974df36a6d8f411b219caad79975b1"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "ad11e5bbe51dc6117bfcbb292bbeadd7"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "bbbfc2185c82fac04d364fb72ca7eb55"
  },
  {
    "url": "tags/零基础/index.html",
    "revision": "45072e4df2839dff01f7de84aedd7afc"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "8225d2ca2070906daed0e6448da665ff"
  },
  {
    "url": "timeline/index.html",
    "revision": "293186dbb468846821e40333f2f3aef6"
  },
  {
    "url": "view.png",
    "revision": "81e8422c4d92eb2d5dd6ddae272bcef0"
  },
  {
    "url": "技术文章/index.html",
    "revision": "180c083923d09f1acec3dc69e9e2305a"
  },
  {
    "url": "技术文章/java/javase.html",
    "revision": "1774563c7b9f1d44c3d280deb3290e46"
  },
  {
    "url": "技术文章/java高级/javaee.html",
    "revision": "4c5aa913296fd7fa26cb572952788a71"
  },
  {
    "url": "技术文章/vue/vue01.html",
    "revision": "47c04d1a2d362a180c1b7fb6f5548d56"
  },
  {
    "url": "生活分享/life.html",
    "revision": "21c29af9e97875805e5b247fdf23f11a"
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
