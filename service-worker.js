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
    "revision": "6e7f9dc804a9ff7932e77c48d7e6d024"
  },
  {
    "url": "AI技术/java/javase.html",
    "revision": "345ef6007a98f1cb855b1c85ce60d636"
  },
  {
    "url": "AI技术/java高级/javaee.html",
    "revision": "0c5f778c49aa135df370e025afb10541"
  },
  {
    "url": "AI技术/vue/vue01.html",
    "revision": "bf95cf01770207fac1b6263fe96041ef"
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
    "url": "assets/js/12.c0990c18.js",
    "revision": "9eadd58d925ae4924dce61e1811b9ae0"
  },
  {
    "url": "assets/js/13.d5fe6400.js",
    "revision": "e63b0b42f7a5d235bba66ab52fa5777a"
  },
  {
    "url": "assets/js/14.51dd0ad3.js",
    "revision": "93eaf48c97b80064dcaac12bc3c98c6b"
  },
  {
    "url": "assets/js/15.4f62a4f2.js",
    "revision": "a0da8bafccfcebf72541aea0106bed3f"
  },
  {
    "url": "assets/js/16.6e75928d.js",
    "revision": "9c0fac4270ee03212a4a605c98c72921"
  },
  {
    "url": "assets/js/17.a2689233.js",
    "revision": "c49d035c380ae96a181e028273907a34"
  },
  {
    "url": "assets/js/18.6066f09c.js",
    "revision": "cd7ade18bb65377b850b7908e2eafdf7"
  },
  {
    "url": "assets/js/19.5f7cd3f5.js",
    "revision": "5706886b0dc71bbcffceb3941364ebc1"
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
    "url": "assets/js/app.658fb6f4.js",
    "revision": "a8b6ed690ad19424a0aa9248cee5138b"
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
    "revision": "fd1b3062b82772902ae7554c4b8b9a53"
  },
  {
    "url": "categories/java/index.html",
    "revision": "ab7ba62551bbf5321849266e85f4ab8a"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "925ca58d69aa94d4e7b436bfcd685f24"
  },
  {
    "url": "categories/生活/index.html",
    "revision": "d1cb345e8202820bbbd00464bdc9facf"
  },
  {
    "url": "css/style.css",
    "revision": "f7f20b54ed2c03173324eac8e555c542"
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
    "revision": "431e3970ac38c0eb37516bb2d2a01f0a"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "0a230fed32340414f519abe645b94b20"
  },
  {
    "url": "tags/JavaSE/index.html",
    "revision": "ec34e2935e5df30370ee39c530108b5b"
  },
  {
    "url": "tags/js/index.html",
    "revision": "0ef01d94fd4e26f12d422aab342dfe2e"
  },
  {
    "url": "tags/Spring/index.html",
    "revision": "15cf9f385e3d1887c4cb27c498dfafdc"
  },
  {
    "url": "tags/SpringBoot/index.html",
    "revision": "9fc864f355bc4f2d7d67d8da50cbd3f0"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "09b7955480f64510557b897d9d3a5c3c"
  },
  {
    "url": "tags/分享生活/index.html",
    "revision": "38ed2f8cfe6275b2cd1b5e2b240929c3"
  },
  {
    "url": "tags/生活/index.html",
    "revision": "c19764f3db3eab93a7816cf8728c92f2"
  },
  {
    "url": "tags/面向对象/index.html",
    "revision": "0daaf28e85d4205e781938ddfba2d5a1"
  },
  {
    "url": "timeline/index.html",
    "revision": "b304e62712f0b796375f3ec75f225205"
  },
  {
    "url": "学有所思/life.html",
    "revision": "d84c5b420bf4b5b704159d3bdaa42173"
  },
  {
    "url": "开发技术/java/javase.html",
    "revision": "ad2bdad8e8b4b0307a308b1536484165"
  },
  {
    "url": "开发技术/java高级/javaee.html",
    "revision": "4d942b7f34dcd259bcd6d334b113174c"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "a7b99fc19aa92944ad3b14707192bffa"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "0f0386800c6be1f25c7bd29e2c52492d"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "bbf6a01752319ff103981df3a35d43fa"
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
