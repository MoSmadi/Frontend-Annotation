chrome.runtime.onMessage.addListener(goToHighlight);

async function goToHighlight(message, sender, sendResponse)
{
    if(message.txt === "highlight")
    {        
        let pageLink = window.location.href;

        let encoded = encodeURIComponent(pageLink);

        let url = "http://localhost:8001/api/annotation/"+ encoded;

        var data;
        
        await fetch(url, { method: 'GET'})
        .then((res) => res.json())
        .then((a) => {
            // alert(JSON.stringify(a))
            data = a;
        })
        .catch((error) => {alert('Error:', error);});
        

        for (let index = 0; index < data.length; index++) 
        {
            let id = data[index]._id
            let text = data[index].text
            let pageURL = data[index].pageURL
            let context = data[index].context
            let pageName = data[index].pageName
            // let textCount = data[index].textCount
            // let textCountNum = data[index].textCountNum
            
            console.log("the original context is : " + context)

            // check if the word is in the page 
           if ((document.documentElement.innerText).indexOf(text) <= -1) // textContent
           {
               // console.log("not found");
               alert(text + " : text not found");
               continue;
           }


            let page = document.body.innerHTML.split("");
            let newText = text.split("");
            var indexArray = [];

            search(indexArray, page, newText); // return array with the indexes for the word

            console.log(text  + " : " + indexArray)
 
            var idddd;
            var found = 0;

            for(var i =0 ; i<indexArray.length ; i++)
            {
                var startInd = [indexArray[i]];

                var last = (parseInt(indexArray[i]))+(text.length)

                var lastInd = [last];
                
                var str = document.body.innerHTML;

                var count = startInd.length;


                for (let j = 0; j < count; j++) 
                {
                    let pre = str.substring(0, startInd[j]);
                    let post = str.substring(lastInd[j], str.length);
                    let phrase = str.substring(startInd[j], lastInd[j]);

                    let nextPhrase;

                    if (j < count - 1) 
                    {
                        nextPhrase = str.substring(startInd[j + 1], lastInd[j + 1]);
                    }

                    str = pre + `<span id="myHeader${i}">${phrase}</span>` + post;

                    if (j < count - 1) 
                    {
                        startInd[j + 1] = str.indexOf(nextPhrase, startInd[j + 1]) - 1;
                        lastInd[j + 1] = startInd[j + 1] + nextPhrase.length;
                    }

                    idddd = "myHeader"+i;
                    console.log(idddd);

                    // TODO : compare inner text for the pre one and th new one

                    var newContent = stripHtml(str);
                    // console.log(newContent)

                    var originalContentHTML = document.body.innerHTML;
                    var originalContent = stripHtml(originalContentHTML);
                    // console.log(originalContent)

                    found =0;

                    if(contentCompare(newContent, originalContent))
                    {
                        try 
                        {
                            document.body.innerHTML = str

                            if(document.getElementById(idddd).parentNode.innerText == context)
                            {
                                console.log(document.getElementById(idddd).parentNode.innerText)
                                i = indexArray.length
                                j = count;
                                found = 1
                                break;
                            }
                        } 
                        
                        catch (error) 
                        {
                            console.log("Not This" + error)
                            break;
                        }
                        
                    }

                    if (found == 0) 
                    {
                        document.body.innerHTML = originalContentHTML
                    }
                    
                }

                // add range select for the index to text.length
            }

            // console.log(indexArray)

 




         // let annotations = document.body.getElementsByTagName('p')[index]; // the word after operations (should do a span and give it a name to retrive it (use index) )

         if(found == 1)
         {
            let annotations = document.getElementById(idddd); // the word after operations (should do a span and give it a name to retrive it (use index) )
            
            annotations.removeAttribute('id');
            // add a new div information 
            addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context);//, textCount, textCountNum


            // set the div as a parent to the word
            var parent = annotations.parentNode
            parent.replaceChild(div, annotations);
            div.appendChild(annotations);

            // annotations.setAttribute('id', "highlightedWord" + index);
         }
           
            
        }
    }
}

function contentCompare(content1, content2)
{
    return content1.length == content2.length
}


function stripHtml(html)
{
   let tmp = document.createElement("div");
   tmp.innerHTML = html;
   return tmp.innerText;
}

function addingDivInformationWithHighlight(index, id, text, pageURL, pageName, context) //, textCount, textCountNum
{
    // add a new div
    div = document.createElement('span');
    div.setAttribute("id", "highlightedWord" + index);

    // add data attribute
    div.dataset._id = id;
    div.dataset.text = text;
    div.dataset.pageURL = pageURL;
    div.dataset.context = context;
    div.dataset.pageName = pageName;
    // div.dataset.textCount = textCount;
    // div.dataset.textCountNum = textCountNum;

    // set new style to the selected word paragraph 
    div.style['background-color'] = '#FFFF00';
    div.style['cursor'] = 'pointer';
    div.onclick = (e) => clickToViewComments(e);
}

function clickToViewComments(clicked_id)
{
    chrome.runtime.sendMessage(
    {
        from:"theHighlightClicked"
        ,id             :   clicked_id.path[1].dataset._id
        ,text           :   clicked_id.path[1].dataset.text
        ,pageURL        :   clicked_id.path[1].dataset.pageURL
        ,pageName       :   clicked_id.path[1].dataset.pageName
        ,context        :   clicked_id.path[1].dataset.context
        // ,textCount      :   clicked_id.path[1].dataset.textCount
        // ,textCountNum   :   clicked_id.path[1].dataset.textCountNum
    }); // send data to background to opent the window
}


// A utility function to get maximum of two integers
function max (a,b)
{
	return (a > b)? a: b;
}

// The preprocessing function for Boyer Moore's
// bad character heuristic
function badCharHeuristic(str,size,badchar)
{
	// Initialize all occurrences as -1
	for (let i = 0; i < 256; i++)
		badchar[i] = -1;

	// Fill the actual value of last occurrence
	// of a character (indices of table are ascii and values are index of occurrence)
	for (i = 0; i < size; i++)
		badchar[ str[i].charCodeAt(0)] = i;
}

/* A pattern searching function that uses Bad
	Character Heuristic of Boyer Moore Algorithm */
function search(indexArray, txt, pat)
{
	let m = pat.length;
	let n = txt.length;

	let badchar = new Array(256);

	/* Fill the bad character array by calling
		the preprocessing function badCharHeuristic()
		for given pattern */
	badCharHeuristic(pat, m, badchar);

	let s = 0; // s is shift of the pattern with
				// respect to text
	// there are n-m+1 potential alignments
	while(s <= (n - m))
	{
		let j = m-1;

		/* Keep reducing index j of pattern while
			characters of pattern and text are
			matching at this shift s */
		while(j >= 0 && pat[j] == txt[s+j])
			j--;

		/* If the pattern is present at current
			shift, then index j will become -1 after
			the above loop */
		if (j < 0)
		{
			// console.log("Patterns occur at shift = " + s);
            indexArray.push(s.toString());
			/* Shift the pattern so that the next
				character in text aligns with the last
				occurrence of it in pattern.
				The condition s+m < n is necessary for
				the case when pattern occurs at the end
				of text */
			//txt[s+m] is character after the pattern in text
			s += (s+m < n)? m-badchar[txt[s+m].charCodeAt(0)] : 1;

		}

		else
			/* Shift the pattern so that the bad character
				in text aligns with the last occurrence of
				it in pattern. The max function is used to
				make sure that we get a positive shift.
				We may get a negative shift if the last
				occurrence of bad character in pattern
				is on the right side of the current
				character. */
			s += max(1, j - badchar[txt[s+j].charCodeAt(0)]);
	}
}


/*

var aTags = document.getElementsByTagName("div");
var searchText = "application"
var found = [];

for (var i = 0; i < aTags.length; i++)
{
  if (aTags[i].innerText.indexOf(searchText) > -1) 
  {
    found.push(aTags[i]);
  }
}

*/