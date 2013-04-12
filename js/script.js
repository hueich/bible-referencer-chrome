(function() {
  // TODO: Fill out the rest of the books.
  /**
   * Mapping of book name variations to the canonical names.
   */
  var BOOK_MAP = {
    "genesis": "genesis",
    "gen": "genesis",
    "exodus": "exodus",
    "ex": "exodus",

    "matthew": "matthew",
    "matt": "matthew",
    "mark": "mark",
    "luke": "luke",
    "john": "john",

    "revelation": "revelation",
    "rev": "revelation"
  };

  var makeRegex = function(mapping) {
    var booksPattern = Object.keys(mapping).join('|');
    var pattern = '(\\b(' + booksPattern + ')\\s+\\d+(:\\d+)?(\\s*(-|~)\\s*\\d+(:\\d+)?)?\\b)';
    return new RegExp(pattern, 'gim');
  };

  var REFERENCE_REGEX = makeRegex(BOOK_MAP);
  // TODO: Make replaced link call to a function.
  var REPLACEMENT_STRING = '<a class="bible-referencer-link" href="javascript:alert(\'Bible reference: $1\');">$1</a>';

  var processPage = function() {
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
    var newText = oldText.replace(REFERENCE_REGEX, REPLACEMENT_STRING);

    if (newText.length != oldText.length) {
      var $html = $.parseHTML(newText);
      $this.replaceWith($html);
    }
  };

  var loader = function() {
    if (document.readyState == 'complete') {
      processPage();
    } else {
      setTimeout(loader, 500);
    }
  }

  loader();
})();
