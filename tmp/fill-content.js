(function() {
  var textareas = document.querySelectorAll('textarea');
  for (var i = 0; i < textareas.length; i++) {
    if (textareas[i].name === 'content') {
      var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      nativeInputValueSetter.call(textareas[i], '测试动态内容 🚀 实时预览验证');
      textareas[i].dispatchEvent(new Event('input', { bubbles: true }));
      return 'filled content textarea';
    }
  }
  return 'no content textarea found, found ' + textareas.length + ' textareas';
})();
