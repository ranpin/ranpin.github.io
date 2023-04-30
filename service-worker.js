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
    "revision": "3355f12de3ea7f2e53aac528a692371e"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "de752e7133af8b0b93e5a5db01abf832"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "321d0d6363680927d5763be16e5b07ae"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "f64e24021eb7a602ebf4532ee6568881"
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
    "url": "assets/js/10.ff70cd9d.js",
    "revision": "5dac284235392f0bd35adfc681900d91"
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
    "url": "assets/js/13.935abcc4.js",
    "revision": "f59a1c624713855375d1f4a590e1e63f"
  },
  {
    "url": "assets/js/14.d5ec624a.js",
    "revision": "0b917c7e9fbc7aa352c7163a61d1517a"
  },
  {
    "url": "assets/js/15.9659200c.js",
    "revision": "ed43ffda8f2fc0659228263ffe16c592"
  },
  {
    "url": "assets/js/16.8bf99ee4.js",
    "revision": "7fb92989b3a9938d55c02ad9768186b7"
  },
  {
    "url": "assets/js/17.34952f3e.js",
    "revision": "c64d062d3641273e4e28fdb39a619e12"
  },
  {
    "url": "assets/js/18.265c8c6f.js",
    "revision": "6a834c53a7b7d0de9f5b47b3901d9f55"
  },
  {
    "url": "assets/js/19.2f1dff69.js",
    "revision": "4e393b6419ef3cec99afefeec8247bf6"
  },
  {
    "url": "assets/js/20.8b9d4aed.js",
    "revision": "6db638b94be61573ae618ed2d567a2bf"
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
    "url": "assets/js/app.269fcd7e.js",
    "revision": "92294d2ee4da3e3f619b0e882583557e"
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
    "revision": "fdd71b19011f9479d5b29e9db36fcba5"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "ed76124116b7b328b627f29e565c969a"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "be6f79e5ba5ba375c77f090a36a913a4"
  },
  {
    "url": "categories/index.html",
    "revision": "5ce1e50b12df19836dd914ed460a3057"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "88497c89bd73f81bd77bfb55faa9d279"
  },
  {
    "url": "categories/Python/index.html",
    "revision": "6f64317841ee0f04f12db9d54f4a148b"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "15e5a52a65b7fa971c649dee688960ec"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "5d0eb46c87e20354833675d5e42ff54a"
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
    "revision": "1131183d949d224699fec5051c849c3f"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "e1c705229e590004454b1eef06b646ef"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "c12889b4514e5c0d646dc334bbbfd42b"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "0e8e0ba5568b83d65773db5338fbc3d6"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "583429ad5a6179ba3dd74db2a3b1c1f6"
  },
  {
    "url": "tags/js/index.html",
    "revision": "3662a0b5257dee2c5b0ca381015065af"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "cbe4ef064500ee458a22244b164f98d3"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "ac2ac56b2b104804fdf4a74d5c770866"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "d50cd93085ccd5e65ef0ecd01e3a7cf6"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "0b62a4a07bbca304e93adc8883aaeac0"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "10eae8b2ab68023f7b63cc43974628fd"
  },
  {
    "url": "timeline/index.html",
    "revision": "9919c04773eceaf468844f6da951bde6"
  },
  {
    "url": "学有所思/life.html",
    "revision": "af812fe978f78380e2e05d766fa589bb"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "a128704a7bb8fb337b8aba9569e91b17"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "e283575af8f086c76b33c68f2e59fad5"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "aef8adde9984165f92a746af461bb7f8"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "c56fdbedc59c3d22db9ac3c87f3c35e7"
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
