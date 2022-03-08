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
      /*
        let ContextCode = "window.getSelection().anchorNode.textContent"
        let index = ContextCode.lastIndexOf(".")
        var parent = ".parentNode";
        var output = [ContextCode .slice(0, index), parent, ContextCode .slice(index)].join('');
      */
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
      let ContextCode = "window.getSelection().anchorNode.parentNode.parentNode.textContent"
      let LengthCode = "window.getSelection().anchorNode.parentNode.parentNode.textContent.length"
      getContext(clickData,tab,ContextCode,LengthCode)
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


// function getContext(selected)
// {
//     //alert(selected)
//     let currentNode = selected;
//     alert("currentNode : "+currentNode);


//     let path = [];

//     while (currentNode != undefined)
//     {
//         //alert("i am innnnn")
//         let pe = getNode(currentNode);
//         alert("pe = getNode(currentNode) : "+pe)
//         if (pe != null)
//         {
//             path.push(pe);
//             if (pe.indexOf('@id') != -1)
//             break;  // Found an ID, no need to go upper, absolute path is OK
//         }
//         currentNode = currentNode.parentNode;
//     }

//     let xpath = "/" + path.reverse().join('/');

//     alert(xpath);
// }

// function getNode(node)
// {
//   let nodeExpr = node.tagName;
//   alert("node.tagName : "+nodeExpr)
//   if (nodeExpr == null)  // Eg. node = #text
//     return null;
	
//   if (node.id != '')
//   {
//     nodeExpr += "[@id='" + node.id + "']";
//     // We don't really need to go back up to //HTML, since IDs are supposed
//     // to be unique, so they are a good starting point.
//     return "/" + nodeExpr;
//   }
// // We don't really need this
// //~   if (node.className != '')
// //~   {
// //~     nodeExpr += "[@class='" + node.className + "']";
// //~   }
//   // Find rank of node among its type in the parent
  
//   let rank = 1;
//   let ps = node.previousSibling;
//   while (ps != null)
//   {
//     if (ps.tagName == node.tagName)
//     {
//       rank++;
//     }
//     ps = ps.previousSibling;
//   }
//   if (rank > 1)
//   {
//     nodeExpr += '[' + rank + ']';
//   }
//   else
//   {
//     // First node of its kind at this level. Are there any others?
//     let ns = node.nextSibling;
//     while (ns != null)
//     {
//       if (ns.tagName == node.tagName)
//       {
//         // Yes, mark it as being the first one
//         nodeExpr += '[1]';
//         break;
//       }
//       ns = ns.nextSibling;
//     }
//   }
//   return nodeExpr;
// }





// chrome.contextMenus.onClicked.addListener( (clickData) => {//,tab
//   if(clickData.menuItemId == "annotate" && clickData.selectionText)
//   {
//       //getContext(clickData.selectionText)
//       //getContext(clickData)
//       //alert(tab.id)
//       // alert(tab.target.value);
//       // alert(tab.target.tagName.toLowerCase());
//       // alert(tab.target)
//       alert(clickData.target.nodeName )
//       // alert(tab.tagName);
//       alert(clickData.tagName );
//       //alert(tab.tagName.toLowerCase());
//   }
// })