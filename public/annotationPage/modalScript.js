var params = new URLSearchParams(window.location.search);

var selectedText = params.get("selectedText");
var pageUrl = params.get("pageUrl");
var pageTitle = params.get("pageTitle")

document.getElementById("demo").innerHTML = "The Selected Word Is : " + selectedText;
document.getElementById("demo1").innerHTML = "The Page URL Is : " +  pageUrl;
document.getElementById("demo2").innerHTML = "The Page Title Is: " + pageTitle;
