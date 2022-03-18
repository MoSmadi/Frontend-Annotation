import React, { Fragment } from "react";
import "../Home.css";
import AllAnotation from "../Mutual Components/anotationButton";
import AllPages from "../Mutual Components/pagesButton";
import About from "../Mutual Components/aboutButton";
import Wiki from "../Functions/wiki";
import Header from "./notLoggedHeader";
import Login from "../../Login/login";

const MyComp = (props) => {
  

  function handleChange(newValue)
  {
    props.onChange(newValue)
  }

  return (
    <Fragment>
      <div className="card">
        <h1 id="title">Annotations</h1>

        <hr />

        <Header value={props.value} onChange = {handleChange}/>
        <AllPages />
        <AllAnotation />
        <About />

        <hr />
        
        <Wiki />
      </div>
    </Fragment>
  );
};

const NotLogged = (props) => 
{
  // const onBack = (event) =>
  // {
  //   props.onChange(!event.value)
  // }onBack={onBack}
  return (
    <div id="not_logged">
      {props.value ? <Login /> : <MyComp {...props} />}
    </div>
  );
};


export default NotLogged;