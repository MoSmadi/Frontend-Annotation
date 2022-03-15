import React from "react";
import * as Components from "../Components";
import axios from 'axios';

const SignupForm = () =>
{

    const [signup , setSignup] = React.useState({
        fullName    : "",
        phoneNumber : "",
        email       : "",
        password    : ""
    })
    
    const handleChange = ({currentTarget: Input})=>
    {
        setSignup({...signup,[Input.name] : Input.value});
    }

    const handleSubmit = async(e)=>
    {
        e.preventDefault(); // prevent the form to act in the default way (dont refresh)

        const signupBody =
        {
            full_name    : signup.fullName,
            phone_number : signup.phoneNumber,
            email       : signup.email,
            password    : signup.password
        }
    
        const url = "http://localhost:8001/api/users"
        
        await axios.post(url,signupBody)

        // Set The Form Fields Empty
        setSignup({
            fullName    : "",
            phoneNumber : "",
            email       : "",
            password    : ""
        })

        // add the state to (true) in the storage and to state rue in the database
        // back to home page
        
    }



    return (

        <Components.Form onSubmit={handleSubmit}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input   type="text"       placeholder="Full Name"     name="fullName"       onChange={handleChange}   value={signup.fullName}     required />
            <Components.Input   type="number"     placeholder="Phone Number"  name="phoneNumber"    onChange={handleChange}   value={signup.phoneNumber}  required />
            <Components.Input   type="email"      placeholder="E-mail"        name="email"          onChange={handleChange}   value={signup.email}        required />
            <Components.Input   type="password"   placeholder="Password"      name="password"       onChange={handleChange}   value={signup.password}     required />
            <Components.Button  type="submit"     style={{ cursor: "pointer" }} >Sign Up</Components.Button>
        </Components.Form>
  );
};

export default SignupForm;
