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
    // alert("open the popup : " + id + " " + result.id)

    const url = "http://localhost:8001/api/comments/"+ result.id +"/"+ id;

    var data;
    
    fetch(url, { method: 'GET'})
    .then((res) => res.json())
    .then((a) => 
    {
      // TODO : return the name and other things from mongoose
      // TODO : try to use (appendTo) to add the (variable) to the right div (append after or smth)

    })
    .catch((error) => {alert('Error:', error);});

  });
}