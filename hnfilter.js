(function () {
  // Polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/contains#Polyfill
  if(!('contains' in String.prototype))
    String.prototype.contains = function(str, startIndex) { return -1 !== String.prototype.indexOf.call(this, str, startIndex); };

  function rejectKeywords(keywords) {
    return function (text) {
      return keywords.some(function (keyword) {
        return text.contains(keyword);
      });
    };
  }

  function filterHomepage(reject) {
    var titleNodes = document.querySelectorAll('.title a');

    if(titleNodes.length === 0)
      return;

    var mainTable = titleNodes[0].parentNode.parentNode.parentNode;

    var rejectCount = 0;
    for (var i = 0; i < titleNodes.length-1; i++) { // the `-1` is to skip the "More" link
      var titleNode = titleNodes[i];
      var title = titleNode.innerHTML;
      var url = titleNode.href;
      if(reject(title)) {
        rejectCount++;
        mainTable.removeChild(titleNode.parentNode.parentNode.nextSibling);
        mainTable.removeChild(titleNode.parentNode.parentNode.nextSibling);
        mainTable.removeChild(titleNode.parentNode.parentNode);
      }
    };

    titleNodes = document.querySelectorAll('.title a');
    for(var j = 0; j < titleNodes.length-1; j++) {
      titleNodes[j].parentNode.parentNode.firstChild.innerHTML = (j+1) + '.';
    }

    console.log('Filtered out ' + rejectCount + ' posts.');
  }

  function filterComments(reject) {
    function getCommentText(commentNode) {
      // TODO: figure out simple way to parse how HN formats commments
      return commentNode.innerHTML;
    }
    var commentNodes = document.querySelectorAll('span.comment');

    if(commentNodes.length === 0)
      return;

    var rejectCount = 0;
    for (var i = 0; i < commentNodes.length; i++) { // the `-1` is to skip the "More" link
      var commentNode = commentNodes[i];
      var comment = getCommentText(commentNode);
      if(reject(comment)) {
        rejectCount++;
        commentNode.parentNode.innerHTML = '[filtered]';
      }
    };
    console.log('Filtered out ' + rejectCount + ' comments.');
  }

  if(document.domain !== 'news.ycombinator.com') {
    alert('This bookmarklet is designed to work only for news.ycombinator.com.');
    return;
  }

  if(document.location.pathname === '/' || document.location.pathname === '/news')
    filterHomepage(rejectKeywords(window.prompt('List keywords to filter out, separated by commas:', '').split(',')));
  else if(document.location.pathname === '/item')
    filterComments(rejectKeywords(window.prompt('List keywords to filter out, separated by commas:', '').split(',')));
})();