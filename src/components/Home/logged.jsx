import React from "react";
import profile from "../../images/profile.png";

const Login = ({
    name,
    email
}) => {
    return (
        <div id="logged_in" style={{ display: "none" }}>
            <div className="top-container">
              <img src={profile} alt="profile" className="img-fluid profile-image" width="70" />
              <div className="ml-3" style={{ marginLeft: "20px" }}>
                <h5 className="name">{name}</h5>
                <p className="mail">{email}</p>
              </div>
            </div>

            <hr/>

            <div className="wishlist-border pt-2">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <span className="wishlist">Websites used annotation</span>
              </a>
            </div>

            <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <span className="fashion-studio">Annotations in This Page</span>
              </a>
            </div>

            <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <span className="fashion-studio">About</span>
              </a>
            </div>


            <div className="pt-2" style={{ marginTop: "10px" }}>
                <span className="fashion-studio">Wiki Search</span>
            </div>


          </div>
    )
}

export default Login;