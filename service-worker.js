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
    "revision": "07da761f5475aeec16178f663174e901"
  },
  {
    "url": "AI技术/BigModel/BigM_SAM.html",
    "revision": "fb0420ae2a9a5128720a167672b33a7d"
  },
  {
    "url": "AI技术/CV/CV.html",
    "revision": "7c3ef96314f85b0ec3cf1e8f6306ba1c"
  },
  {
    "url": "AI技术/NLP/NLP.html",
    "revision": "0905881c4bec7bd497c30e86d0ba70a8"
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
    "url": "assets/js/10.97b82b05.js",
    "revision": "9aaee315aafeea28b2bc9b8f482ce7c3"
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
    "url": "assets/js/16.c5fa28d2.js",
    "revision": "0711d50eec16a7ef941bbd1bd1d61c71"
  },
  {
    "url": "assets/js/17.d98fc855.js",
    "revision": "6c222664a5b8525ae03f27c0286cde21"
  },
  {
    "url": "assets/js/18.e0a92d33.js",
    "revision": "3036515b5d47f33a69b33ba21fcabed3"
  },
  {
    "url": "assets/js/19.860ac3ef.js",
    "revision": "69ef2ecf2ddc684f3076452a725f6006"
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
    "url": "assets/js/app.308da3b4.js",
    "revision": "a15723d1ea0d29c8fef1c6a53651b603"
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
    "revision": "206a44bfd036b93fa486fa91e3dac42a"
  },
  {
    "url": "categories/BigModel/index.html",
    "revision": "00dd0aeedf63d9c984bba941609230f9"
  },
  {
    "url": "categories/CV/index.html",
    "revision": "1fd3c9c593af780d5f3c577e734a04c7"
  },
  {
    "url": "categories/index.html",
    "revision": "f379e68cc8e198ccde7eb8481502e430"
  },
  {
    "url": "categories/NLP/index.html",
    "revision": "08f0991cd70ed776e51e5428f9f47d4e"
  },
  {
    "url": "categories/Python/index.html",
    "revision": "007cf43689fe52edd42639f5b6435cb2"
  },
  {
    "url": "categories/前端/index.html",
    "revision": "3bf671fead8e260d5a693f4719461383"
  },
  {
    "url": "categories/学有所思/index.html",
    "revision": "d51d04b69a21ae9356c63a774c240577"
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
    "revision": "280cf59437eb4d96f0b35b9078492767"
  },
  {
    "url": "js/custom.js",
    "revision": "437cc118e8b3a7a5a38efe104ad892b2"
  },
  {
    "url": "tag/index.html",
    "revision": "7ad955d86f8bcbe48ddc711eccdbfadd"
  },
  {
    "url": "tags/AI开发/index.html",
    "revision": "bc6d44604044b6e3cb98a9b4a555f4d6"
  },
  {
    "url": "tags/BigModel/index.html",
    "revision": "0a6c73f426453304b5edb3427017f0a4"
  },
  {
    "url": "tags/CV/index.html",
    "revision": "372c39fa2c1b5adc103a1d21532b58ca"
  },
  {
    "url": "tags/js/index.html",
    "revision": "5419ab984220dc8b967e1bac94898846"
  },
  {
    "url": "tags/NLP/index.html",
    "revision": "09750c68a5f8c66f1c557e353c8917f9"
  },
  {
    "url": "tags/SAM/index.html",
    "revision": "ee617b64fff49237146d7171960bae3a"
  },
  {
    "url": "tags/TensorFlow/index.html",
    "revision": "6deb4520cc6cbea1958145eb6339cc5d"
  },
  {
    "url": "tags/vue/index.html",
    "revision": "700a7d13aa4052ed2bd726f2e9a0cd44"
  },
  {
    "url": "tags/学有所思/index.html",
    "revision": "b04bdd5ddeddc0fabfea278322634202"
  },
  {
    "url": "timeline/index.html",
    "revision": "7ba937d98c7ddc9531943fb2ff40b612"
  },
  {
    "url": "学有所思/life.html",
    "revision": "a7561613a9273598c2a160079f63eeb8"
  },
  {
    "url": "开发技术/AI开发/tensorflow.html",
    "revision": "127b4215f2ba86be09b01b85b65f8479"
  },
  {
    "url": "开发技术/vue/vue01.html",
    "revision": "8c6eec24ea3a41d030a5e616dfd5f16f"
  },
  {
    "url": "本站总览/guide/guide.html",
    "revision": "90af298dbe2f09c60ce0aa9f85d1f49f"
  },
  {
    "url": "本站总览/timeline/timeline.html",
    "revision": "7417b575392402cf72504c007a1fcd53"
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
