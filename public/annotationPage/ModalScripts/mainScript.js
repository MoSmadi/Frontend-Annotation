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
  chrome.storage.local.get(['id'], function (result)
  {
    let annotationId = id;
    let userId = result.id;

    renderUsers(userId, annotationId);
  });
}


async function getUsers(userId, annotationId) 
{
  const url = "http://localhost:8001/api/comments/" + userId + "/" + annotationId;

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


async function renderUsers(userId, annotationId)
{
  let comments = await getUsers(userId, annotationId);
  let html = '';

  comments.forEach(comment => 
  {
    let date = comment.createdAt.split("T")

    date = date[0].split("-")

    let day = date[2]
    let month = date[1]
    let year = date[0]

    let temp =
      `
    <div class="media-body">
        <div class="well well-lg">
            <h4 class="media-heading text-uppercase reviews">` + comment.userId.full_name + `</h4>
            <ul class="media-date text-uppercase reviews list-inline">
                <li class="dd">` + day + `</li>
                <li class="mm">` + month + `</li>
                <li class="aaaa">` + year + `</li>
            </ul>
            <p class="media-comment">
            `+ comment.text + ` 
            </p>
            <a class="btn btn-info btn-circle text-uppercase" href="#" id="reply">
                Reply
            </a>
            
        </div>
    </div>
    `
    // <a class="btn btn-warning btn-circle text-uppercase" data-toggle="collapse" href="#replyOne">
    //     2 comments
    // </a>

    html += temp;
  });

  let container = document.querySelector('.media-list');
  container.innerHTML = html;
}