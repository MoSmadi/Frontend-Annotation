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

        var count = 0;
        for(var i of annotations)
        {
            // add a new div
            g = document.createElement('div');
            g.setAttribute("id", "highlightedWord"+count++);

            // set new style to the selected word paragraph 
            g.style['background-color'] = '#FFFF00';
            g.style['cursor'] = 'pointer';
            g.onclick = () => reply_click(this.id)

            // set the div as a parent to the word
            var parent = i.parentNode
            parent.replaceChild(g, i);
            g.appendChild(i);


            // document.getElementById(g.id).onclick = function call(this.id)
            // {
            //     alert('you clicked at : ' + clicked_id); // call a function open comment modal that dont add the annotation to the database again
            // }
        }
    }
}

function reply_click(clicked_id)
{
    alert('you clicked at : ' + clicked_id); // call a function open comment modal that dont add the annotation to the database again
}