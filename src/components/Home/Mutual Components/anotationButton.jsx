    /*global chrome*/
import { tab } from "@testing-library/user-event/dist/tab";
import React from "react";

const AllAnotation = () => 
{
  function buttonClicked()
  {
    console.log("tab");
  }

  function highlight()
  {

    let params = 
    {
      active : true,
      currentWindow : true
    }
    chrome.tabs.query(params,gotTabs)

    function gotTabs(tabs)
    {
      let msg = {
        txt: "highlight"
      }
      chrome.tabs.sendMessage(tabs[0].id,msg)
    }

  }

    return (

            <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              {/* ()=>highlight() */}
              <a href="#">
                <span className="fashion-studio" onClick={highlight}>Annotations in This Page</span>
              </a>
            </div>

    )
}

export default AllAnotation;