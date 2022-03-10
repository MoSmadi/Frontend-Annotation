import React from "react";
import "../Home.css";
import AllAnotation from "../Mutual Components/anotationButton";
import AllPages from "../Mutual Components/pagesButton";
import About from "../Mutual Components/aboutButton";
import Wiki from "../Functions/wiki";
import Header from "./loggedHeader";
import Logout from "./logout";

const Logged = ({ name, email }) => {
  return (
    
      <div id="logged_in" style={{}}>
        <div className="card">
        <Header name={name} email={email} />

        <hr />

        <AllPages />

        <AllAnotation />

        <About />
        
        <Logout />

        <hr />

        <Wiki />
      </div>
    </div>
  );
};

export default Logged;
