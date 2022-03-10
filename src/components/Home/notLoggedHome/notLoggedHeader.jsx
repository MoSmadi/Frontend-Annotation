import React from "react";

const LoggedHeader = (props) => 
{

  function handleChange(event)
  {
    props.onChange(!event.value)
  }
  
    return (
      <div onClick={() => {handleChange(props) }}>
        
        <div className="wishlist-border pt-2" style={{ marginBottom: "10px" }}>
          
          <a href={() => false} style={{ cursor: "pointer" }}>
            <span className="recent-orders"  > Login / Signup </span>
          </a>

        </div>
      </div>
    );
}

export default LoggedHeader;