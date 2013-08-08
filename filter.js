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

    for (var i = 0; i < titleNodes.length-1; i++) { // the `-1` is to skip the "More" link
      var titleNode = titleNodes[i];
      var title = titleNode.innerHTML;
      var url = titleNode.href;
      var removedNodes = false;
      if(reject(title)) {
        mainTable.removeChild(titleNode.parentNode.parentNode.nextSibling);
        mainTable.removeChild(titleNode.parentNode.parentNode.nextSibling);
        mainTable.removeChild(titleNode.parentNode.parentNode);
      }
    };

    titleNodes = document.querySelectorAll('.title a');
    for(var j = 0; j < titleNodes.length-1; j++) {
      titleNodes[j].parentNode.parentNode.firstChild.innerHTML = (j+1) + '.';
    }
  }
  filterHomepage(rejectKeywords(window.prompt("List keywords to filter out, separated by commas:", "").split(',')));
})();