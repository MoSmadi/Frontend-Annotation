chrome.runtime.onMessage.addListener(goToHighlight);

async function goToHighlight(message, sender, sendResponse) 
{
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
            let id = data[index]._id
            let text = data[index].text
            let pageURL = data[index].pageURL
            let context = data[index].context
            let pageName = data[index].pageName
            // let textCount = data[index].textCount
            // let textCountNum = data[index].textCountNum

            // console.log("the original context is : " + context)

            // check if the word is in the page 
            if ((document.documentElement.innerText).indexOf(text) <= -1) // textContent
            {
                alert(text + " : text not found");
                continue;
            }


            let page = document.body.innerHTML;//.split("");
            let newText = text;//.split("");
            var indexArray = [];

            search(indexArray, page, newText); // return array with the indexes for the word

            console.log(" ")
            console.log(" ")
            console.log(" ")
            console.log(text + " : " + indexArray)

            var newID;
            var found = false;

            for (var i = 0; i < indexArray.length; i++) 
            {
                var startInd = [indexArray[i]];

                var last = (parseInt(indexArray[i])) + (text.length)

                var lastInd = [last];

                var str = document.body.innerHTML;

                var count = startInd.length;


                for (let j = 0; j < count; j++) // count always 1
                {
                    let pre = str.substring(0, startInd[j]); // all html elements before the word
                    let post = str.substring(lastInd[j], str.length); // all html elements after the word
                    let phrase = str.substring(startInd[j], lastInd[j]); // the word

                    let nextPhrase;

                    if (j < count - 1) 
                    {
                        nextPhrase = str.substring(startInd[j + 1], lastInd[j + 1]);
                    }

                    str = pre + `<span id="myHeader${i}">${phrase}</span>` + post; // make the new innerHtml
                    newID = "myHeader" + i;
                    
                    if (j < count - 1) 
                    {
                        startInd[j + 1] = str.indexOf(nextPhrase, startInd[j + 1]) - 1;
                        lastInd[j + 1] = startInd[j + 1] + nextPhrase.length;
                    }


                    // TODO : compare inner text for the pre one and th new one

                    var newContent = stripHtml(str);
                    var originalContentHTML = document.body.innerHTML;
                    var originalContent = stripHtml(originalContentHTML);

                    found = false;

                    if (contentCompare(newContent, originalContent)) 
                    {
                        try 
                        {
                            document.body.innerHTML = str

                            if (document.getElementById(newID).parentNode.innerText == context)
                            {
                                console.log(document.getElementById(newID).parentNode.innerText)
                                i = indexArray.length
                                j = count;
                                found = true
                            }
                        }

                        catch (error)
                        {
                            console.log("Not This" + error)
                            break;
                        }

                    }

                    if (found == 0) 
                    {
                        document.body.innerHTML = originalContentHTML
                    }

                }
            }



            if (found)
            {
                highlightTheWord(newID, index, id, text, pageURL, pageName, context);
            }


        }
    }
}



function highlightTheWord(newID, index, id, text, pageURL, pageName, context) 
{
    console.log("found");

    let annotations = document.getElementById(newID); // the word after operations (should do a span and give it a name to retrive it (use index) )

    annotations.removeAttribute('id');

    // add a new div information 
    addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context); //, textCount, textCountNum


    // set the div as a parent to the word
    var parent = annotations.parentNode;
    parent.replaceChild(div, annotations);
    div.appendChild(annotations);
}




function contentCompare(content1, content2) 
{
    return content1.length == content2.length
}

function stripHtml(html)
{
    let tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.innerText;
}

function addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context) //, textCount, textCountNum
{
    // add a new div
    div = document.createElement('span');
    div.setAttribute("id", "highlightedWord" + index);

    // add data attribute
    div.dataset._id = id;
    div.dataset.text = text;
    div.dataset.pageURL = pageURL;
    div.dataset.context = context;
    div.dataset.pageName = pageName;
    // div.dataset.textCount = textCount;
    // div.dataset.textCountNum = textCountNum;

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
            , id: clicked_id.path[1].dataset._id
            , text: clicked_id.path[1].dataset.text
            , pageURL: clicked_id.path[1].dataset.pageURL
            , pageName: clicked_id.path[1].dataset.pageName
            , context: clicked_id.path[1].dataset.context
            // ,textCount      :   clicked_id.path[1].dataset.textCount
            // ,textCountNum   :   clicked_id.path[1].dataset.textCountNum
        }); // send data to background to opent the window
}


function search(indexArray, txt, pat)
{
    let M = pat.length;
    let N = txt.length;

    /* A loop to slide pat one by one */
    for (let i = 0; i <= N - M; i++) {
        let j;

        /* For current index i, check for pattern
        match */
        for (j = 0; j < M; j++)
            if (txt[i + j] != pat[j])
                break;

        // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
        if (j == M)
        {
            indexArray.push(i);
            console.log("Pattern found at index " + i);
        }
    }
}