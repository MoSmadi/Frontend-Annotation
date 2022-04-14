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

      let selectedText    =   clickData.selectionText;
      let pageUrl         =   clickData.pageUrl;
      let pageTitle       =   tab.title;
      //let context         =   getContext(ContextCode,LengthCode);
      //let countInPage     =   getNumberOfWordsSameInPage(selectedText);
      //let countInContext  =   getNumberOfWordsInTheContest(selectedText,context);


      //window.open('../modal.html')

 
      var params = new URLSearchParams();

      params.append("selectedText",selectedText);
      params.append("pageUrl",pageUrl);
      params.append("pageTitle",pageTitle);

  
      var url="../annotationPage/modal.html?"+params.toString();
  
      window.open(url, 'title', 'width=500,height=300');
        

  
      
      // alert("Selection Text : "   + selectedText)
      // alert("Page URL : "            + pageUrl)
      // alert("Page Title : "          + pageTitle)
      // alert("Count In Page : "       + countInPage)
      // alert("Context is : "       + context)

      //getContext(clickData,tab,ContextCode,LengthCode)
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
          return selection;
      });
    }
  });
}

function getNumberOfWordsSameInPage(selectedText)
{
  let page = document.body.innerText;
	let wordInRegex = new RegExp("SPA" , "ig");
  let count = (page.match(wordInRegex )).length;
  alert( count);
}


/*

chrome.contextMenus.create(
    {
        "id": "annotate",
        "title": "Click To Add Comment 👆", /* what appears in the menu 
        "contexts": ['selection']  /* to make this appear only when user selects something on page 
    }
);

chrome.contextMenus.onClicked.addListener( (clickData,tab) => //
{
    if(clickData.menuItemId == "annotate")
    {
      let ContextCode     =   "window.getSelection().anchorNode.textContent"
      let LengthCode      =   "window.getSelection().anchorNode.textContent.length"
      //let localNameCode   =   "window.getSelection().anchorNode.parentNode.localName"

      let selectedText    =   clickData.selectionText;
      //let context         =   getContext(ContextCode,LengthCode);
      let countInPage     =   getNumberOfWordsSameInPage(selectedText);
      let countInContext  =   getNumberOfWordsInTheContest(selectedText,context);


      let pageUrl         =   clickData.pageUrl;
      let pageTitle       =   tab.title;
    
    
    
      alert(pageUrl)
      alert(pageTitle)
      alert(countInPage)
      alert(countInContext)
    }
})

function getContext(ContextCode,LengthCode)//,localNameCode
{
  // chrome.tabs.executeScript({code: localNameCode }, (localName) =>
  // {
  //   if(localName == "p")
  //   {
  //     chrome.tabs.executeScript({code: ContextCode }, (selection) => 
  //     {
  //        return selection
  //     });
  //   }

  //   else
  //   {
  //     let parentNode = ".parentNode";
  //     let indexContext = ContextCode.lastIndexOf(".")

  //     var newContextCode = [ContextCode .slice(0, indexContext), parentNode, ContextCode .slice(indexContext)].join('');
  //     var newlocalNameCode = [localNameCode .slice(0, indexContext), parentNode, localNameCode .slice(indexContext)].join('');

  //     getContext(newContextCode,newlocalNameCode)
  //   }

  // })
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

      getContext(newContextCode,newLengthCode)
    }
    
    else
    {
      chrome.tabs.executeScript({code: ContextCode }, (selection) => 
      {
          alert("Context : " + selection)
      });
    }
  });
}

function getNumberOfWordsSameInPage(selectedText)
{
  var page = document.body.textContent;
	var wordInRegex = new RegExp(selectedText , "ig");
  return (page.match(wordInRegex )).length;
}

function getNumberOfWordsInTheContest(selectedText,context)
{
	var wordInRegex = new RegExp(selectedText , "ig");
  return (context.match(wordInRegex )).length;
}

function getLocalName(localnameCode)
{
  chrome.tabs.executeScript({code: localnameCode }, (localName) => 
  {
    return localName;
  })
}

*/




/**
 
if (selectedText.length > 0) 
{
  var first = selectedText;
  let origin = window.location.origin;
  let link = window.location.href;//link

  //alert(origin);
 
  var params = new URLSearchParams();
  params.append("first",first);
  params.append("link",link);//link
  var url="http://localhost:8080/HelloWorld/new.html?"+params.toString();

  window.open(url, 'title', 'width=500,height=300');
      
}

 */