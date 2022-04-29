let params = new URLSearchParams(window.location.search);

let id = params.get("id");
let text = params.get("text");

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

    let data;
    
    fetch(url, { method: 'GET' })
    .then((res) => res.json())
    .then((a) => {
      // alert(JSON.stringify(a))
      data = a;
  })

  // TODO : return the name and other things from mongoose
  // TODO : split the data created to add it to the code
  // TODO : try to use (appendTo) to add the (variable) to the right div (append after or smth)

// for(let i=0 ; i<data.length ; i++)
// {
//   let variable = 
//   '<li class="media">' + 
//   ' <div class="media-body">' + 
//   '   <div class="well well-lg">' + 
//   '     <h4 class="media-heading text-uppercase reviews">'+data[i]._id+'</h4>' + // name
//   '     <ul class="media-date text-uppercase reviews list-inline">' + 
//   '       <li class="dd">'+data[i]._id+'</li>' + //day
//   '       <li class="mm">'+data[i]._id+'</li>' + //month
//   '       <li class="aaaa">'+data[i]._id+'</li>' + //year
//   '     </ul>' + 
//   '     <p class="media-comment">' +  data[i].text + '</p>' + //commnent
//   '		</div>' + 
//   '	</div>' + 
//   '</li>';
// }
  


  });
}