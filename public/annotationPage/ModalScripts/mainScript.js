let params = new URLSearchParams(window.location.search);

let id = params.get("id");
let text = params.get("text");

document.getElementById("title").innerHTML = "Leave your comment for (" + text + ")";


chrome.storage.local.get(['loggedin'], function (result) 
{
  if (result.loggedin == true) 
  {
    document.getElementById("comment").style.display = "block";
  }

  else 
  {
    document.getElementById("notSignned").style.display = "block";
  }
});


if (id != 0) 
{
  chrome.storage.local.get(['id'], function ()
  {
    let annotationId = id;
    renderComments(annotationId);
  });
}


async function getComments(annotationId) 
{
  const url = "http://localhost:8001/api/comments/" + "/" + annotationId;

  try 
  {
    let res = await fetch( url , { method: 'GET'});
    return await res.json();
  } 
  
  catch (error) 
  {
    console.log(error);
  }
}

async function getUser(userId) 
{
  const url = "http://localhost:8001/api/users/"+ userId;

  try 
  {
    let res = await fetch( url , { method: 'GET'});
    return await res.json();
  } 
  
  catch (error) 
  {
    console.log(error);
  }
}

async function renderComments(annotationId)
{
  let comments = await getComments(annotationId);
  var html = '';
  
  await comments.forEach (async comment  => 
  {
    let date = comment.createdAt.split("T")

    date = date[0].split("-")

    let day = date[2]
    let month = date[1]
    let year = date[0]

    
    

    let user = await getUser(comment.userId);
    
    // chrome.extension.getBackgroundPage().console.log(user)

    var userFullName = user.full_name;


    let temp =
      `
    <div class="media-body">
        <div class="well well-lg">
            <h4 class="media-heading text-uppercase reviews">` + userFullName + `</h4>
            <ul class="media-date text-uppercase reviews list-inline">
                <li class="dd">` + day + `</li>
                <li class="mm">` + month + `</li>
                <li class="aaaa">` + year + `</li>
            </ul>
            <p class="media-comment">
            `+ comment.text + ` 
            </p>
        </div>
    </div>
    `
    // <a class="btn btn-info btn-circle text-uppercase" href="#" id="reply">
    //     Reply
    // </a>
    // <a class="btn btn-warning btn-circle text-uppercase" data-toggle="collapse" href="#replyOne">
    //     2 comments
    // </a>

    html += temp;

    let container = document.querySelector('.media-list');
    container.innerHTML = html;
  });
}