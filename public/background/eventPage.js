chrome.runtime.onMessage.addListener(function(data) {
  if (data.from == "theHighlightClicked")
  {
    openExistsPage(data.id, data.text, data.urlPage, data.pageName, data.context, data.textCount, data.textCountNum)
  }
});


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

      let textContent = localNameCode + "textContent";

      chrome.tabs.executeScript({ code: textContent }, (context) => 
      {
        openNewPageToAddComment(context, clickData, tab);
      });
    }
  });
}


function openNewPageToAddComment(context, clickData, tab) 
{
  alert("add comment clicked")

  let text        =   clickData.selectionText;
  let pageURL     =   clickData.pageUrl;
  let pageName    =   tab.title;
  // let textCount   =   getNumberOfWordsSameInPage(selectedText);

  let params = new URLSearchParams();

  params.append("id", 0);
  params.append("text", text);
  params.append("state", true);
  params.append("pageURL", pageURL);
  params.append("context", context);
  params.append("pageName", pageName);
  // params.append("textCount", textCount);
  // params.append("textCountNum", textCountNum);

  let url = "../annotationPage/modal.html?" + params.toString();

  window.open(url, 'Add Comment', 'width=520,height=450');
}


function openExistsPage(id, text, pageURL, pageName, context, textCount, textCountNum, pageName) 
{
  alert("highlight clicked")
  let params = new URLSearchParams();

  alert(id)
    params.append("id", id);
    params.append("text", text);
    params.append("state", false);
    params.append("pageURL", pageURL);
    params.append("context", context);
    params.append("pageName", pageName);
    params.append("textCount", textCount);
    params.append("textCountNum", textCountNum);


  let url = "../annotationPage/modal.html?" + params.toString();

  window.open(url, 'Add Comment', 'width=520,height=450');
}

