var params = new URLSearchParams(window.location.search);

var selectedText = params.get("selectedText");
var pageUrl = params.get("pageUrl");
var pageTitle = params.get("pageTitle")

document.getElementById("demo").innerHTML = "The Selected Word Is : " + selectedText;
document.getElementById("demo1").innerHTML = "The Page URL Is : " +  pageUrl;
document.getElementById("demo2").innerHTML = "The Page Title Is: " + pageTitle;


// check if is logged in (API Storage)
chrome.storage.local.get(['loggedin'], function(result)
  {
      console.log('Value currently is ' + result.loggedin);
      if(result.loggedin ==  true)
      {
          alert("logged")
      }
    
      else
      {
          alert("not logged")
      }
  });


document.addEventListener('DOMContentLoaded', function() 
{
    var link = document.getElementById('btn');
    link.addEventListener('click', function() {
        call();
    });
});


function call()
{
    alert("sds")
}