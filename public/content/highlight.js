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
            var urlPage = data[index].urlPage
            var context = data[index].context
            var textCount = data[index].textCount
            var textCountNum = data[index].textCountNum
            


            let annotations = document.body.getElementsByTagName('p')[index]; // the word after operations

            
            // add a new div information 
            addingDivInformationWithHighlight(index, id, text, urlPage, context, textCount, textCountNum);


            // set the div as a parent to the word
            var parent = annotations.parentNode
            parent.replaceChild(div, annotations);
            div.appendChild(annotations);
            
        }
    }
}

function addingDivInformationWithHighlight(index, id, text, urlPage, context, textCount, textCountNum) 
{
    // add a new div
    div = document.createElement('div');
    div.setAttribute("id", "highlightedWord" + index);

    // add data attribute
    div.dataset._id = id;
    div.dataset.text = text;
    div.dataset.urlPage = urlPage;
    div.dataset.context = context;
    div.dataset.textCount = textCount;
    div.dataset.textCountNum = textCountNum;

    // set new style to the selected word paragraph 
    div.style['background-color'] = '#FFFF00';
    div.style['cursor'] = 'pointer';
    div.onclick = (e) => clickToViewComments(e);
}

function clickToViewComments(clicked_id)
{
    console.log(clicked_id.path[1].dataset._id);
    console.log(clicked_id.path[1].dataset.text);
    console.log(clicked_id.path[1].dataset.urlPage);
    console.log(clicked_id.path[1].dataset.context);
    console.log(clicked_id.path[1].dataset.textCount);
    console.log(clicked_id.path[1].dataset.textCountNum);
    // alert('you clicked at : ' + clicked_id); // call a function open comment modal that dont add the annotation to the database again
}