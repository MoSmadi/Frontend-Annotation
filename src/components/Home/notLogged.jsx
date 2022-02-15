import React from "react";
import AllAnotation from "./Mutual Components/anotationButton";
import AllPages from "./Mutual Components/pagesButton";
import About from "./Mutual Components/aboutButton";
import Wiki from "./Functions/wiki";
import Header from "./Header/notLoggedHeader";

const notLogged = () => 
{
    return (
        <div id="not_logged" style={{}}>
            <h1 id="title">Annotations</h1>
            
            <Header />

            <AllPages />

            <AllAnotation />

            <About />
            
            <hr />

            <Wiki />

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