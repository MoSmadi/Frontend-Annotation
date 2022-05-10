chrome.runtime.onMessage.addListener(function(data) {
  if (data.from == "theHighlightClicked")
  {
    openExistsPage(data.id, data.text, data.pageURL, data.pageName, data.context, data.textCount, data.textCountNum)
  }
});


chrome.contextMenus.create(
  {
    "id": "annotate",
    "title": "Click To Add Comment 👆", /* what appears in the menu */
    "contexts": ['selection']  /* to make this appear only when user selects something on page */
  }, () => chrome.runtime.lastError
);


chrome.contextMenus.onClicked.addListener((clickData, tab) => 
{
  if (clickData.menuItemId == "annotate") 
  {
    let localNameCode = "window.getSelection().anchorNode.parentElement.localName"
    getContext(localNameCode, clickData, tab)
  }
})


function getNumberOfWordsSameInPage(page,selectedText) 
{
  page = page.toString();
  let wordInRegex = new RegExp(selectedText, "ig");
  let count = (page.match(wordInRegex)).length;
  return count;
}


function getContext(localNameCode, clickData, tab) 
{
  chrome.tabs.executeScript({ code: localNameCode }, (localName) => 
  {
    
    if (localName == 'h1'   || localName == 'h2'    || localName == 'h3'    || localName == 'h4'      ||
        localName == 'h5'   || localName == 'h6'    || localName == 'p'     || localName == 'b'       ||
        localName == 'pre'  || localName == 'em'    || localName == 'i'     || localName == 'a'       ||
        localName == 'li'   || localName == 'br'    || localName == 'q'     || localName == 'strong'  || 
        localName == 'mark' || localName == 'ins'   || localName == 'del'   || localName == 'sup'     ||
        localName == 'sub'  || localName == 'small' || localName == 'span'  || localName == 'dt'      || 
        localName == 'code' || localName == 'blockquote') 
    {
      localNameCode = localNameCode.slice(0, -9); // Remove => localName

      let textContent = localNameCode + "textContent";

      chrome.tabs.executeScript({ code: "document.body.innerText" }, async (page) => // for count
      {
        var count = await getNumberOfWordsSameInPage(page,clickData.selectionText);

        chrome.tabs.executeScript({ code: textContent }, (context) => // for context
        {
          openNewPageToAddComment(context, clickData, tab, count);
        });
      });
    }
  });
}


function openNewPageToAddComment(context, clickData, tab, textCount) 
{
  let text        =   clickData.selectionText;
  let pageURL     =   clickData.pageUrl;
  let pageName    =   tab.title;

  let params = new URLSearchParams();

  params.append("id", 0);
  params.append("text", text);
  params.append("state", true);
  params.append("pageURL", pageURL);
  params.append("context", context);
  params.append("pageName", pageName);
  params.append("textCount", textCount);
  // params.append("textCountNum", textCountNum);

  let url = "../annotationPage/modal.html?" + params.toString();

  window.open(url, 'Add Comment', 'width=520,height=450');
}


function openExistsPage(id, text, pageURL, pageName, context, textCount, textCountNum) 
{
  let params = new URLSearchParams();

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

