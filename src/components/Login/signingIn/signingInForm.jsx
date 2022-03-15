import React from "react";
import * as Components from "../Components";
import axios from 'axios';

const SigninForm = () =>
{

    const [signin , setSignin] = React.useState({
        email       : "",
        password    : ""
    })
    
    const handleChange = ({currentTarget: Input})=>
    {
        setSignin({...signin,[Input.name] : Input.value});
    }

    const handleSubmit = async(e)=>
    {
        e.preventDefault(); // prevent the form to act in the default way (dont refresh)

        const signinBody =
        {
            email       : signin.email,
            password    : signin.password
        }
    
        let Email = signin.email.toString();
        let Password  = signin.password.toString();

        const url = "http://localhost:8001/api/users/"+ Email +"/"+ Password;
        
        console.log(url)
        const getPosts = await axios.get(url)

        console.log(getPosts.status);

        if(getPosts.status===200)
        {
            alert("correct password")
            // change the status on the storage to logged then go home page 
        }

        if(getPosts.status===409)
        {
            alert("wrong password")
            // change the status on the storage to logged then go home page 
        }
    }



    return (
// 
// <Components.Input   type="password"   placeholder="Password"      name="Password"       onChange={handleChange}   value={signin.Password}     required />
// <Components.Button  type="submit"     style={{ cursor: "pointer" }} >Sign Up</Components.Button>


        <Components.Form onSubmit={handleSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input   type="email"        placeholder="E-mail"      name="email"      onChange={handleChange}     value={signin.email}        required />
            <Components.Input   type="password"     placeholder="Password"    name="password"   onChange={handleChange}     value={signin.password}     required/>
            <Components.Anchor  href="#">Forgot your password?</Components.Anchor>
            <Components.Button  type="submit"       style={{ cursor: "pointer" }} >Sign In</Components.Button>
        </Components.Form>
  );
};

export default SigninForm;
