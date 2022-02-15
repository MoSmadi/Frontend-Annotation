import React from "react";

const notLogged = () => 
{
    return (
        <div id="not_logged" style={{}}>
            <h1 id="title">Annotations</h1>
            <hr />
            <div className="wishlist-border pt-2" style={{ marginBottom: "10px" }}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <span className="recent-orders"> Login / Signup </span>
              </a>
            </div>

            <div className="wishlist-border pt-2">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">
                <span className="wishlist">Websites used anottation</span>
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
            

            {/* <div class=" pt-2" style={{ marginTop: "10px" }}>
              <span class="fashion-studio">Wiki Search</span>
              <div class="toggle-button-cover">
                <div class="button-cover">
                  <div class="button r" id="button-1">
                    <input type="checkbox" class="checkbox" name={props.name}  defaultChecked={props.defaultChecked}  onChange={ this.handleChange() }/>
                    <div class="knobs"></div>
                    <div class="layer"></div>
                  </div>

                </div>
              </div>
            </div> */}

          </div>
    )
}

export default notLogged;