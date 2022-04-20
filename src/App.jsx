    /*global chrome*/
// import React, { useEffect } from "react";
import React from "react";
import wiki from "./wiki.js";
import Logged from "./components/Home/loggedHome/logged";
import NotLogged from "./components/Home/notLoggedHome/notLogged";

// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {
//   BrowserRouter as Router,
//   Routes ,
//   Route,
//   Link,
//   Redirect
// } from "react-router-dom"

const App = () => {
  let [isLoggedIn, setIsLoggedIn] = React.useState(false);
  let [email, setemail] = React.useState("");
  let [fullName, setfullName] = React.useState("");

  chrome.storage.local.get(['loggedin'], function(result)
  {
    // console.log('Value currently is ' + result.loggedin);
    setIsLoggedIn(result.loggedin)
  });

  chrome.storage.local.get(['email'], function(result) {
    // console.log('Value is set to ' + result.email);
    setemail(result.email)
  });

chrome.storage.local.get(['fullName'], function(result) {
    // console.log('Value is set to ' + result.fullName);
    setfullName(result.fullName)
  });

  const [logged, setLogged] = React.useState(false);

  function handleChange(newValue)
  {
    setLogged(newValue)
  }

  return (
    <div className="App">
      <span>{wiki()}</span>
      <div className="d-flex justify-content-center container mt-5">

          {isLoggedIn ? (
            <Logged name={fullName} email={email} />
          ) : (
            <NotLogged value = {logged} onChange = {handleChange} />
          )}

        </div>
      </div>
  );
};

export default App;