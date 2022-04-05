chrome.contextMenus.create(
    {
        "id": "annotate",
        "title": "Click To Add Comment 👆", /* what appears in the menu */
        "contexts": ['selection']  /* to make this appear only when user selects something on page */
    }
);

chrome.contextMenus.onClicked.addListener( (clickData,tab) => //
{
    if(clickData.menuItemId == "annotate")
    {
      let ContextCode = "window.getSelection().anchorNode.textContent"
      let LengthCode = "window.getSelection().anchorNode.textContent.length"
      getContext(clickData,tab,ContextCode,LengthCode)
    }
})

function getContext(clickData,tab,ContextCode,LengthCode)
{
  chrome.tabs.executeScript({code: LengthCode }, (length) => 
  {
    alert("Context Length is : " + length)
    if(length<320)
    {
      let parentNode = ".parentNode";
      let indexContext = ContextCode.lastIndexOf(".")
      var newContextCode = [ContextCode .slice(0, indexContext), parentNode, ContextCode .slice(indexContext)].join('');

      let parentLength = ".parentNode";
      let indexLength = ContextCode.lastIndexOf(".")
      var newLengthCode = [LengthCode .slice(0, indexLength), parentLength, LengthCode .slice(indexLength)].join('');

      getContext(clickData,tab,newContextCode,newLengthCode)
    }
    else
    {
      chrome.tabs.executeScript({code: ContextCode }, (selection) => 
      {
          alert("Selection Text : " + clickData.selectionText)
          alert("Page URL" + clickData.pageUrl)
          alert("Page Title" + tab.title)
          alert("Context : " + selection)
      });
    }
  });
}