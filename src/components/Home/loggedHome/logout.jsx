    /*global chrome*/
import React from "react";

function LoggedInStatus ()
{
  let loggedStatus = false;

  chrome.storage.local.set({loggedin: loggedStatus}, function() 
  {
    console.log('Value is set to ' + loggedStatus);
  });
  window.location.reload(false);
}

const Logout = () =>
 {
  return (
    <div className="wishlist-border pt-2" onClick={LoggedInStatus} style={{ marginTop: "10px" }}>
          
    <a href={() => false} style={{ cursor: "pointer" }}>
       {/* onClick={LoggedInStatus} */}
      <span className="recent-orders" > Logout </span>
    </a>

  </div>
  );
};

export default Logout;
