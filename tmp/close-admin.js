(function() {
  var btns = document.querySelectorAll('button');
  for (var i = 0; i < btns.length; i++) {
    if (btns[i].textContent.indexOf('关闭') > -1 || btns[i].textContent.indexOf('×') > -1) {
      btns[i].click();
      return 'clicked close button: ' + btns[i].textContent;
    }
  }
  return 'no close button found';
})();
