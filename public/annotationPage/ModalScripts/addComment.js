let paramsIn = new URLSearchParams(window.location.search);

let idIn = paramsIn.get("id");
let textIn = paramsIn.get("text");
let stateIn = paramsIn.get("state");
let pageURLIn = paramsIn.get("pageURL");
let contextIn = paramsIn.get("context");
let pageNameIn = paramsIn.get("pageName");
// let textCountIn = paramsIn.get("textCount");
// let textCountNumIn = paramsIn.get("textCountNum");

let textCountIn = "5"
let textCountNumIn = "2"



document.addEventListener('DOMContentLoaded', function() 
{
    let comment = document.getElementById('commentForm');

    comment.addEventListener('submit', function() 
    {
      if(stateIn)
      {
        AddAnnotation(pageURLIn,pageNameIn,textIn,textCountIn,textCountNumIn,contextIn)
      }
      AddComment();
    });
});


function AddComment()
{
  alert("submit and add comment")

  let comment = document.getElementById("addComment").value; // get the textarea value

  chrome.storage.local.get(['id'], function(result) 
  {
    const data = 
    { 
      userId: result.id,
      annotateId: idIn, // return the id from the pre function
      text: comment
    };

    let options =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }

    const url = "http://localhost:8001/api/comments/"+ idIn +"/"+ result.id;

    fetch(url, options)
    .then(alert("done to comment"))
    .then(() => window.close())
    .catch((error) => {alert('Error:', error)});
  }); 
}


function AddAnnotation(pageURL,pageName,text,textCount,textCountNum,context)
{
  alert("added annotation")
  let data = 
  {
    text : textIn,
    pageURL : pageURLIn,
    context : contextIn,
    pageName : pageNameIn,
    textCount : textCountIn,
    textCountNum : textCountNumIn
  }

  let options =
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const url = "http://localhost:8001/api/annotation/";

  fetch(url, options).catch((error) => {alert('Error:', error)});
}