chrome.runtime.onMessage.addListener(goToHighlight);

async function goToHighlight(message, sender, sendResponse)
{
    if(message.txt === "highlight")
    {        
        let pageLink = window.location.href;

        let encoded = encodeURIComponent(pageLink);

        let url = "http://localhost:8001/api/annotation/"+ encoded;

        var data;
        
        await fetch(url, { method: 'GET'})
        .then((res) => res.json())
        .then((a) => {
            // alert(JSON.stringify(a))
            data = a;
        })
        .catch((error) => {alert('Error:', error);});
        

        for (let index = 0; index < data.length; index++) 
        {
            var id = data[index]._id
            var text = data[index].text
            var pageURL = data[index].pageURL
            var context = data[index].context
            var pageName = data[index].pageName
            var textCount = data[index].textCount
            var textCountNum = data[index].textCountNum
            


            // check if the word is in the page 
            // if ((document.documentElement.textContent || document.documentElement.innerText).indexOf(text) <= -1) 
            // {
            //     console.log("not found");
            //     continue;
            // }



            // let annotations = document.body.getElementsByTagName('p')
            // var count = 0;
            // var found = [];
            // for (var i = 0; i < annotations.length; i++) 
            // {
            //     if (annotations[i].innerText.indexOf(text) > -1)
            //     {
            //         count++;
            //         found.push(annotations[i].innerText.match(text));
            //     }
            // }

            


            let annotations = document.body.getElementsByTagName('p')[index]; // the word after operations

            
            // add a new div information 
            addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context, textCount, textCountNum);


            // set the div as a parent to the word
            var parent = annotations.parentNode
            parent.replaceChild(div, annotations);
            div.appendChild(annotations);
            
        }
    }
}

function addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context, textCount, textCountNum) 
{
    // add a new div
    div = document.createElement('div');
    div.setAttribute("id", "highlightedWord" + index);

    // add data attribute
    div.dataset._id = id;
    div.dataset.text = text;
    div.dataset.pageURL = pageURL;
    div.dataset.context = context;
    div.dataset.pageName = pageName;
    div.dataset.textCount = textCount;
    div.dataset.textCountNum = textCountNum;

    // set new style to the selected word paragraph 
    div.style['background-color'] = '#FFFF00';
    div.style['cursor'] = 'pointer';
    div.onclick = (e) => clickToViewComments(e);
}

function clickToViewComments(clicked_id)
{
    chrome.runtime.sendMessage(
    {
        from:"theHighlightClicked"
        ,id             :   clicked_id.path[1].dataset._id
        ,text           :   clicked_id.path[1].dataset.text
        ,pageURL        :   clicked_id.path[1].dataset.pageURL
        ,context        :   clicked_id.path[1].dataset.context
        ,textCount      :   clicked_id.path[1].dataset.textCount
        ,textCountNum   :   clicked_id.path[1].dataset.textCountNum
    }); // send data to background to opent the window
}




/*

var aTags = document.getElementsByTagName("div");
var searchText = "application"
var found = [];

for (var i = 0; i < aTags.length; i++)
{
  if (aTags[i].innerText.indexOf(searchText) > -1) 
  {
    found.push(aTags[i]);
  }
}

*/