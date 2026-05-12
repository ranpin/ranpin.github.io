(function() {
  var overlay = document.querySelector('body > iframe');
  if (overlay) { overlay.remove(); }
  var scripts = document.querySelectorAll('script');
  for (var i = 0; i < scripts.length; i++) {
    if (scripts[i].textContent && scripts[i].textContent.indexOf('handleError') > -1) {
      scripts[i].remove();
    }
  }
  return 'done';
})();
