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

  // const GetInfo = async (e)=>
  //   {
  //       e.preventDefault(); // prevent the form to act in the default way (dont refresh)

  //       const signinBody =
  //       {
  //           email       : signin.email
  //       }
    
  //       let Email = signin.email.toString();

  //       const url = "http://localhost:8001/api/users/"+ Email;
        

  //       await axios.get(url).then(value => 
  //       {
  //           setIsAuthorized(true)
  //           alert("correct password")

  //           let loggedStatus = true;
            

  //       }, error => {
  //           alert("wrong password")
  //       })

        
  //       // chrome.storage.local.get(['loggedin'], function(result) {
  //       //     console.log('Value currently is ' + result.loggedin);
  //       //   });
       
  //   }




  
  // chrome.storage.local.set({loggedin: true}, function() {
  //   console.log('Value is set to true');
  // });

  chrome.storage.local.get(['loggedin'], function(result)
  {
    console.log('Value currently is ' + result.loggedin);
    setIsLoggedIn(result.loggedin)
  });

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

        </div>
      </div>
  );
};

export default App;