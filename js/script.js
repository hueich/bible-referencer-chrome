(function() {
  if (window.addEventListener) {
    window.addEventListener('load', processPage, false);
  } else if (window.attachEvent) {
    window.attachEvent('onload', processPage);
  } else {
    // Browser too old, so ignore.
    return;
  }

  // TODO: Fill out the rest of the patterns.
  var BIBLE_REFERENCE_PATTERN = /(\b(gen(esis)?|ex(odus)?|matt(hew)?|mark|luke|john)\s+\d+(:\d+)?(\s*(-|~)\s*\d+(:\d+)?)?\b)/gim;
  // TODO: Make replaced link call to a function.
  var REPLACEMENT_STRING = '<a class="bible-referencer-link" href="javascript:alert(\'Bible reference: $1\');">$1</a>';

  function processPage() {
    selectTextNodes().each(injectLink);
  }

  /**
   * Returns a jQuery collection of text nodes.
   */
  var selectTextNodes = function() {
    return $('body').find(':not(iframe)').addBack().contents().filter(function() {
      return this.nodeType == Node.TEXT_NODE && nodeFilter($(this));
    });
  };

  /**
   * Returns true if node is accepted; false otherwise.
   */
  var nodeFilter = function($node) {
    return $node.text().trim() != ''
        // TODO: Add more excluded tags.
        && $node.parents('script,noscript,style,a,textarea,select,img').length == 0;
  }

  var injectLink = function() {
    var $this = $(this);
    var oldText = $this.text();
    var newText = oldText.replace(BIBLE_REFERENCE_PATTERN, REPLACEMENT_STRING);

    if (newText.length != oldText.length) {
      var $html = $.parseHTML(newText);
      $this.replaceWith($html);
    }
  };
})();
