# HNFilter

A bookmarklet to filter out posts on Hacker News.

# Bookmarklet
Simply save the code below to a bookmark:
```javascript

javascript:(function(){function e(e){return function(t){return e.some(function(e){return t.contains(e)})}}function t(e){var t=document.querySelectorAll(".title a");if(t.length===0)return;var n=t[0].parentNode.parentNode.parentNode;for(var r=0;r<t.length-1;r++){var i=t[r];var s=i.innerHTML;var o=i.href;var u=false;if(e(s)){n.removeChild(i.parentNode.parentNode.nextSibling);n.removeChild(i.parentNode.parentNode.nextSibling);n.removeChild(i.parentNode.parentNode)}}t=document.querySelectorAll(".title a");for(var a=0;a<t.length-1;a++){t[a].parentNode.parentNode.firstChild.innerHTML=a+1+"."}}if(!("contains"in String.prototype))String.prototype.contains=function(e,t){return-1!==String.prototype.indexOf.call(this,e,t)};t(e(window.prompt("List keywords to filter out, separated by commas:","").split(",")))})();

```

# Usage
Click the bookmarklet when on the main page of Hacker News, and type in terms to
filter out. All posts with those terms in the title will be removed.

# Coming Soon
* Filtering by site, poster, points, date, number of comments
* Comment filtering