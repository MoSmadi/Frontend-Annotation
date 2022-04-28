var params = new URLSearchParams(window.location.search);

var id = params.get("id");
var text = params.get("text");
var pageURL = params.get("pageURL");
var context = params.get("context");
var pageName = params.get("pageName");
var textCount = params.get("textCount");
var textCountNum = params.get("textCountNum");

document.getElementById("title").innerHTML = "Leave your comment for (" + text + ")";

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
