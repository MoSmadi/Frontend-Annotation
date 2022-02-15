chrome.contextMenus.create(
    {
        "id": "annotate",
        "title": "Click To Add Comment 👆", /* what appears in the menu */
        "contexts": ['selection']  /* to make this appear only when user selects something on page */
    }
);

chrome.contextMenus.onClicked.addListener( (clickData) => {
    if(clickData.menuItemId == "annotate"){
        alert("Clicked 👏")
    }
})