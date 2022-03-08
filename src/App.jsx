// import React, { useEffect } from "react";
import React from "react";
import wiki from "./wiki.js";
import Logged from "./components/Home/logged";
import NotLogged from "./components/Home/notLogged";
// import Login from "./components/Login/login";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {
//   BrowserRouter as Router,
//   Routes ,
//   Route,
//   Link,
//   Redirect
// } from "react-router-dom"

const App = () => {
  let [isLoggedIn] = React.useState(false);
  //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [logged, setLogged] = React.useState(false);

  // useEffect(() => {
  //   localStorage.getItem("loggedIn")
  //   setIsLoggedIn();
  // }, [])

  function handleChange(newValue)
  {
    setLogged(newValue)
  }


  const email = "mo.smadi@outlook.com";

  return (
    <div className="App">
      <span>{wiki()}</span>
      <div className="d-flex justify-content-center container mt-5">

          {isLoggedIn ? (
            <Logged name="Mohammad Smadi" email={email} />
          ) : (
            <NotLogged value = {logged} onChange = {handleChange} />
          )}

          {/* <NotLogged /> */}
        </div>
      </div>
  );
};

export default App;
