chrome.runtime.onMessage.addListener(goToHighlight);

async function goToHighlight(message, sender, sendResponse) 
{
    // window.location.reload();
    if (message.txt === "highlight") 
    {
        let pageLink = window.location.href;

        let encoded = encodeURIComponent(pageLink);

        let url = "http://localhost:8001/api/annotation/" + encoded;

        var data;

        await fetch(url, { method: 'GET' })
            .then((res) => res.json())
            .then((a) => 
            {
                data = a;
            })
            .catch((error) => { alert('Error:', error); });


        for (let index = 0; index < data.length; index++) 
        {
            var id = data[index]._id
            var text = data[index].text
            var pageURL = data[index].pageURL
            var context = data[index].context
            var pageName = data[index].pageName
            

            // check if the word is in the page 
            if ((document.documentElement.innerText).indexOf(text) <= -1) // textContent
            {
                alert(text + " : text not found");
                continue;
            }
            

            var treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);

            var node;
            // var newID;

            while(node = treeWalker.nextNode())
            {
                try 
                {
                    
                    // if(!node.firstChild.hasChildNodes())
                    {      
                        if(node.textContent.includes(text))
                        {
                            // let res; 

                            // let dataToNLP = 
                            // { 
                            //     oldContext : context ,
                            //     newContext : node.innerText
                            // };
        
                            // let options =
                            // {
                            //     method: 'POST',
                            //     headers: { 'Content-Type': 'application/json' },
                            //     body: JSON.stringify(dataToNLP)
                            // }
                            
                            // let url = "http://127.0.0.1:5000/getSimilarity";
        
                            // try
                            // {
                            //     res = await fetch(url, options);
                                
                            // } 
        
                            // catch (error) 
                            // {
                            //     alert('Error in annotation:', JSON.stringify(error.message));
                            // }
        
                            // console.log(res.json());
        
                            if(node.innerText == context)
                            {
                                var page = node.innerHTML;

                                var regexp = new RegExp(text);
                                
                                node.innerHTML = page.replace(regexp,`<span id="myHeader`+ index + `">`+ text + `</span>`)

                                break;
                            }
                        }
                    }
                } 
                
                catch (error) 
                {
                    
                } 
            }

        }

        for (let index = 0; index < data.length; index++) 
        {
            var id = data[index]._id
            var text = data[index].text
            var pageURL = data[index].pageURL
            var context = data[index].context
            var pageName = data[index].pageName
            

            var newID = "myHeader" + index;

            try
            {
                addingDivInformationWithHighlight(newID, id, text, pageURL, pageName, context); //, textCount, textCountNum 
            }
            
            catch (error) 
            {
                
            }
        }
    }
}


function addingDivInformationWithHighlight(newID, id, text, pageURL, pageName, context) //, textCount, textCountNum
{
    const div = document.getElementById(newID)

    // console.log(div)

    // add data attribute
    div.dataset._id = id;
    div.dataset.text = text;
    div.dataset.pageURL = pageURL;
    div.dataset.context = context;
    div.dataset.pageName = pageName;


    // set new style to the selected word paragraph 
    div.style['background-color'] = '#FFFF00';
    div.style['cursor'] = 'pointer';
    div.onclick = (e) => clickToViewComments(e);

}

function clickToViewComments(clicked_id)
{
    chrome.runtime.sendMessage(
        {
            from: "theHighlightClicked"
            , id: clicked_id.path[0].dataset._id
            , text: clicked_id.path[0].dataset.text
            , pageURL: clicked_id.path[0].dataset.pageURL
            , pageName: clicked_id.path[0].dataset.pageName
            , context: clicked_id.path[0].dataset.context
        }); // send data to background to opent the window
}