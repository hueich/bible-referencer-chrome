(function() {
  if (window.addEventListener) {
    window.addEventListener('load', processPage, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', processPage);
  } else {
    // Browser too old, so ignore.
    return;
  }

  function processPage() {
    console.log(elementSelector());
    elementSelector().each(injectLinks);
  }

  /**
   * Returns a jQuery collection of selected elements.
   */
  var elementSelector = function() {
    return $('body').find(':not(iframe)').addBack().contents().filter(function() {
      if (this.nodeType == Node.TEXT_NODE) {
        var $this = $(this);
        return $this.text().trim() != ''
            && $this.parents('script,noscript,style,a,textarea').length == 0;
      }
      return false;
    });
  };

  var injectLinks = function() {
    var $this = $(this);
    // var html = $this.html();
    var html = $this.text();
    // console.log('before:' + html);
    var pattern = /(\b(gen(esis)?|ex(odus)?|matt(hew)?|mark|luke|john)\s+\d+(:\d+)?(\s*(-|~)\s*\d+(:\d+)?)?\b)/gim;

    html = html.replace(pattern, '<a href="verseLookup(\'$1\')">$1</a>');
    // console.log('after: ' + html);
    $this.html(html); // TODO: This doesn't seem to work on a text node. Need to do DOM manip.
  };

})();
