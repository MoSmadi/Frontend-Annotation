chrome.contextMenus.create(
    {
        "id": "annotate",
        "title": "Click To Add Comment 👆", /* what appears in the menu */
        "contexts": ['selection']  /* to make this appear only when user selects something on page */
    }
);

chrome.contextMenus.onClicked.addListener( (clickData,tab) => 
{
    if(clickData.menuItemId == "annotate")
    {
      let localNameCode   =   "window.getSelection().anchorNode.parentElement.localName"

      let selectedText    =   clickData.selectionText;
      let pageUrl         =   clickData.pageUrl;
      let pageTitle       =   tab.title;


      // getContext(localNameCode)
      
      //let context         =   getContext(localNameCode);
      //let countInPage     =   getNumberOfWordsSameInPage(selectedText);
      //let countInContext  =   getNumberOfWordsInTheContest(selectedText,context);

 
      let params = new URLSearchParams();

      params.append("selectedText",selectedText);
      params.append("pageUrl",pageUrl);
      params.append("pageTitle",pageTitle);

  
      let url="../annotationPage/modal.html?"+params.toString();
  
      window.open(url, 'Add Comment', 'width=520,height=450');
    }
})


function getNumberOfWordsSameInPage(selectedText)
{
  let page = document.body.innerText;
	let wordInRegex = new RegExp(selectedText , "ig");
  let count = (page.match(wordInRegex)).length;
  alert( count);
  return count;
}


function getContext(localNameCode)
{
  chrome.tabs.executeScript({code: localNameCode }, (localName) => 
  {
    alert("Local Name is : " + localName)

    if(localName == 'p')
    {
      localNameCode = localNameCode.slice(0, -9); // Remove => localName

      var textContent = localNameCode + "textContent";

      alert(textContent);

      chrome.tabs.executeScript({code: textContent }, (content) => 
      {
          alert(content);
      });
    }
  });
}


/*

//window.getSelection().anchorNode.parentElement.nextElementSibling.children[0].textContent

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

function getNumberOfWordsSameInPage(selectedText)
{
  var page = document.body.innerText;
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




/*  first context code



// let ContextCode = "window.getSelection().anchorNode.textContent"
// let LengthCode = "window.getSelection().anchorNode.textContent.length"


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


*/