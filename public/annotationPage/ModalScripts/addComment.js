var params = new URLSearchParams(window.location.search);

var selectedText = params.get("selectedText");
var pageUrl = params.get("pageUrl");
var pageTitle = params.get("pageTitle")

var textCount = "5"
var textCountNum = "2"
var context = "hello i am context"



document.addEventListener('DOMContentLoaded', function() 
{
    let comment = document.getElementById('commentForm');

    comment.addEventListener('submit', function() 
    {
      AddAnnotation(pageUrl,pageTitle,selectedText,textCount,textCountNum,context)
      AddComment();
    });
});



function AddComment()
{
  let comment = document.getElementById("addComment").value; // get the textarea value

  chrome.storage.local.get(['id'], function(result) 
  {
    let userId = result.id
    alert(userId);
  });

  alert(comment);

  const data = { 
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

function AddAnnotation(urlPage,pageName,text,textCount,textCountNum,context)
{
    var data = 
    {
      urlPage : urlPage,
      pageName : pageName,
      text : text,
      textCount : textCount ,
      textCountNum : textCountNum ,
      context : context
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