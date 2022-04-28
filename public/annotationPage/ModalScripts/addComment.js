var params = new URLSearchParams(window.location.search);

// var id = params.get("id");
var text = params.get("text");
var pageURL = params.get("pageURL");
var context = params.get("context");
var pageName = params.get("pageName");
// var textCount = params.get("textCount");
// var textCountNum = params.get("textCountNum");

var textCount = "5"
var textCountNum = "2"



document.addEventListener('DOMContentLoaded', function() 
{
    let comment = document.getElementById('commentForm');

    comment.addEventListener('submit', function() 
    {
      AddAnnotation(pageURL,pageName,text,textCount,textCountNum,context)
      AddComment();
    });
});



function AddComment()
{
  let comment = document.getElementById("addComment").value; // get the textarea value

  chrome.storage.local.get(['id'], function(result) 
  {
    let userId = result.id
  });

  const data = 
  { 
    userId: 'example',
    annotateId: 'annotateId',
    text: comment,
  };

  const url = "http://localhost:8001/api/users/abc@def.com/1234";

  fetch(url, { 
    method: 'GET'
  })
  .then((res) => res.json())
  .then((a) => alert(JSON.stringify(a)))
  .then(() => window.close());

  alert("The comment is Submitted")
}

function AddAnnotation(pageURL,pageName,text,textCount,textCountNum,context)
{
    var data = 
    {
      text : text,
      pageURL : pageURL,
      context : context,
      pageName : pageName,
      textCount : textCount,
      textCountNum : textCountNum
    }

    var options =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    const url = "http://localhost:8001/api/annotation/";

    fetch(url, options).catch((error) => {alert('Error:', error)});
}