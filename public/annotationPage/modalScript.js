var params = new URLSearchParams(window.location.search);

var selectedText = params.get("selectedText");
var pageUrl = params.get("pageUrl");
var pageTitle = params.get("pageTitle")

document.getElementById("title").innerHTML = "Leave your comment for (" + selectedText + ")";
// document.getElementById("demo1").innerHTML = "The Page URL Is : " +  pageUrl;
// document.getElementById("demo2").innerHTML = "The Page Title Is: " + pageTitle;


// check if is logged in (API Storage)
chrome.storage.local.get(['loggedin'], function(result)
  {
      console.log('Value currently is ' + result.loggedin);
      if(result.loggedin ==  true)
      {
        document.getElementById("comment").style.display = "block";
      }
    
      else
      {
        document.getElementById("notSignned").style.display = "block";
      }
  });


document.addEventListener('DOMContentLoaded', function() 
{
    var link = document.getElementById('reply');
    link.addEventListener('click', function() {
        call();
    });
});


function call()
{
    alert("sds")
}