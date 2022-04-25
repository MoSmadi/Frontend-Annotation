var params = new URLSearchParams(window.location.search);

var selectedText = params.get("selectedText");
var pageUrl = params.get("pageUrl");
var pageTitle = params.get("pageTitle")
var context = params.get("context")

document.getElementById("title").innerHTML = "Leave your comment for (" + selectedText + ")";

chrome.storage.local.get(['loggedin'], function(result)
  {
      if(result.loggedin ==  true)
      {
        document.getElementById("comment").style.display = "block";
      }
    
      else
      {
        document.getElementById("notSignned").style.display = "block";
      }
  });

  // var data = 
  // {
  //   urlPage : pageUrl,
  //   pageName : pageTitle,
  //   text : selectedText,
  //   textCount : "5" ,
  //   textCountNum : "2" ,
  //   context : "hello please notificate me" 
  // }

  // const url = "http://localhost:8001/api/annotation/";

  // fetch(url, { 
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // })
  //.then((a) => alert(JSON.stringify(a)));
