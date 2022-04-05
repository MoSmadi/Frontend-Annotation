chrome.runtime.onMessage.addListener(goToHighlight);

function goToHighlight(message, sender, sendResponse)
{
    if(message.txt === "highlight")
    {
        let x = document.getElementsByTagName('p');
        for(var i of x)
        {
            i.style['background-color'] = '#FF00FF';
        }
    }
}