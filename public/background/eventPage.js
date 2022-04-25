chrome.contextMenus.create(
  {
    "id": "annotate",
    "title": "Click To Add Comment 👆", /* what appears in the menu */
    "contexts": ['selection']  /* to make this appear only when user selects something on page */
  }
);

chrome.contextMenus.onClicked.addListener((clickData, tab) => 
{
  if (clickData.menuItemId == "annotate") 
  {
    let localNameCode = "window.getSelection().anchorNode.parentElement.localName"
    getContext(localNameCode, clickData, tab)
  }
})


function getNumberOfWordsSameInPage(selectedText) 
{
  let page = document.body.innerText; // not working --> there is no content in event page
  let wordInRegex = new RegExp(selectedText, "ig");
  let count = (page.match(wordInRegex)).length;
  return count;
}


function getContext(localNameCode, clickData, tab) 
{
  chrome.tabs.executeScript({ code: localNameCode }, (localName) => 
  {
    if (localName == 'p') 
    {
      localNameCode = localNameCode.slice(0, -9); // Remove => localName

      var textContent = localNameCode + "textContent";

      chrome.tabs.executeScript({ code: textContent }, (context) => 
      {
        openPage(context, clickData, tab);
      });
    }
  });
}


function openPage(context, clickData, tab) 
{
  let selectedText = clickData.selectionText;
  let pageUrl = clickData.pageUrl;
  let pageTitle = tab.title;
  // let countInPage     =   getNumberOfWordsSameInPage(selectedText);

  let params = new URLSearchParams();

  params.append("selectedText", selectedText);
  // params.append("countInPage", countInPage);
  params.append("pageTitle", pageTitle);
  params.append("pageUrl", pageUrl);
  params.append("context", context);


  let url = "../annotationPage/modal.html?" + params.toString();

  window.open(url, 'Add Comment', 'width=520,height=450');
}