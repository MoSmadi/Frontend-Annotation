import React from "react";
import AllAnotation from "./Mutual Components/anotationButton";
import AllPages from "./Mutual Components/pagesButton";
import About from "./Mutual Components/aboutButton";
import Wiki from "./Functions/wiki";
import Header from "./Header/loggedHeader";


const Logged = ({
    name,
    email
}) => {
    return (
        <div id="logged_in" style={{}}>

            <Header name={name} email={email}/>

            <hr/>

            <AllPages />

            <AllAnotation />

            <About />

            <hr />
            
            <Wiki />

          </div>
    )
}

export default Logged;