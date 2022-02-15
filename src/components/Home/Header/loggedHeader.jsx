import React from "react";
import profile from "../../../images/profile.png";

const notLoggedHeader = ({
    name,
    email
}) => 
{
    return (

      <div className="top-container">
        <img
          src={profile}
          alt="profile"
          className="img-fluid profile-image"
          width="70"
        />

        <div className="ml-3" style={{ marginLeft: "20px" }}>
            
          <h5 className="name">{name}</h5>
          <p className="mail">{email}</p>
        </div>
      </div>
    );
}

export default notLoggedHeader;