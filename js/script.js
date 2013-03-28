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

    // DEBUG
    var newDiv = document.createElement('p');
    newDiv.id = 'walker-container';
    document.body.appendChild(newDiv);
    // END DEBUG

    processEachNode(injectLinks);

  }

  var processEachNode = function(processor) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, nodeFilter, false);
    while (walker.nextNode()) {
      processor(walker.currentNode);
    }
  }

  var nodeFilter = function(node) {
    var $node = $(node);
    if ($node.parents('script,noscript,style,a,textarea').length > 0) {
      return NodeFilter.FILTER_REJECT;
    }
    console.log($node.text());
    if ($.trim($node.text()) == '') {
      console.log('it\'s empty!')
      return NodeFilter.FILTER_REJECT;
    }
    console.log('accepted!');
    return NodeFilter.FILTER_ACCEPT;
  };

  var injectLinks = function(node) {
    // DEBUG
    $('#walker-container').text($('#walker-container').text() + node.nodeValue + '\n');
    // END DEBUG
  }
})();
