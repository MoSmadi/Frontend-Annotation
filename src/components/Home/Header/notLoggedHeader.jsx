import React from "react";

const LoggedHeader = () => 
{
    return (
      <div>
          <hr />
        <div className="wishlist-border pt-2" style={{ marginBottom: "10px" }}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">
            <span className="recent-orders"> Login / Signup </span>
          </a>
        </div>
      </div>
    );
}

export default LoggedHeader;