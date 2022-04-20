chrome.runtime.onMessage.addListener(goToHighlight);

function goToHighlight(message, sender, sendResponse)
{
    if(message.txt === "highlight")
    {        
        let pageLink = window.location.href;

        let encoded = encodeURIComponent(pageLink);

        let url = "http://localhost:8001/api/annotation/"+ encoded;

        fetch(url, { method: 'GET'})
        .then((res) => res.json())
        .then((a) => alert(JSON.stringify(a)))
        .catch((error) => {alert('Error:', error);});


        let annotations = document.getElementsByTagName('p');

        // TODO : need to make something like array or map to store each word with it context and the number of it in the page or something like that --> to know which annotation i clicked 

        for(var i of annotations)
        {
            i.style['background-color'] = '#FF00FF';
            
            i.style['cursor'] = 'pointer';
            
            i.onclick = function()
            {
                alert('you clicked me'); // call a function open comment modal that dont add the annotation to the database again
            }
        }
    }
}