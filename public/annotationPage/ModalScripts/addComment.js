let paramsIn = new URLSearchParams(window.location.search);

let idIn = paramsIn.get("id");
let textIn = paramsIn.get("text");
let stateIn = paramsIn.get("state");
let pageURLIn = paramsIn.get("pageURL");
let contextIn = paramsIn.get("context");
let pageNameIn = paramsIn.get("pageName");
// let textCountIn = paramsIn.get("textCount");
// let textCountNumIn = paramsIn.get("textCountNum");


document.addEventListener('DOMContentLoaded', function() 
{
  let comment = document.getElementById('commentForm');

    comment.addEventListener('submit', function(event) 
    {
      
  event.preventDefault();

      if (idIn == 0) {
        AddAnnotation(pageURLIn,pageNameIn,textIn,contextIn)//,textCountIn,textCountNumIn
        .then(data => 
          {
          var newId = JSON.stringify(data._id)
          annotateId = newId.replace(/^"+|"+$/g, '');
          AddComment(annotateId);
        });
      } else {
        AddComment(idIn);
      }
    });
});


function AddComment(annotateId)
{
  let comment = document.getElementById("addComment").value; // get the textarea value
  
  chrome.storage.local.get(['id'], async function(result) 
  {
    var userId = result.id

    const data = 
    { 
      userId : userId ,
      annotateId : annotateId, 
      text : comment
    };

    let options =
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    
    const url = "http://localhost:8001/api/comments/"+ userId + "/" + annotateId ;

    try {
      await fetch(url, options);
      return window.close();
    } catch (error) {
      alert('Error:', error.message);
    }
  }); 
}


async function AddAnnotation(pageURLIn,pageNameIn,textIn,contextIn)//,textCountIn,textCountNumIn
{
  let data = 
  {
    text : textIn,
    pageURL : pageURLIn,
    context : contextIn,
    pageName : pageNameIn,
    // textCount : textCountIn,
    // textCountNum : textCountNumIn
  }

  let options =
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }

  const url = "http://localhost:8001/api/annotation/";

  try {
    const res = await fetch(url, options);
    return await res.json();
  } catch (error) {
    alert('Error in annotation:', JSON.stringify(error.message));
  }
}