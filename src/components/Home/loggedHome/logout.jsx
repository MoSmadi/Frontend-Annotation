    /*global chrome*/
import React from "react";

function LoggedInStatus ()
{
  let fullName = "";
  let email = "";
  let loggedStatus = false;

  chrome.storage.local.set({loggedin: loggedStatus}, function() 
  {
    console.log('Value is set to ' + loggedStatus);
  });

  chrome.storage.local.set({email: email}, function() {
    console.log('Value is set to ' + email);
  });

  chrome.storage.local.set({fullName: fullName}, function() {
    console.log('Value is set to ' + fullName);
  });

  window.location.reload(false);
}

const Logout = () =>
 {
  return (
    <div className="wishlist-border pt-2" onClick={LoggedInStatus} style={{ marginTop: "10px" }}>
          
    <a href={() => false} style={{ cursor: "pointer" }}>
      <span className="recent-orders" > Logout </span>
    </a>

  </div>
  );
};

export default Logout;
