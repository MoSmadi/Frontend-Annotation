let params = new URLSearchParams(window.location.search);

let id = params.get("id");
let text = params.get("text");
let state = params.get("state");
let pageURL = params.get("pageURL");
let context = params.get("context");
let pageName = params.get("pageName");
let textCount = params.get("textCount");
let textCountNum = params.get("textCountNum");

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


if(id != 0)
{
  chrome.storage.local.get(['id'], function(result) 
  {
    alert("open the popup : " + id + " " + result.id)
    const url = "http://localhost:8001/api/comments/"+ result.id +"/"+ id;

    fetch(url, { 
      method: 'GET'
    })
    .then((res) => res.json())
    .then((a) => alert(JSON.stringify(a)))
  });
}