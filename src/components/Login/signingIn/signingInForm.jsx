    /*global chrome*/
import React, {useState} from "react";
import * as Components from "../Components";
import axios from 'axios';

const SigninForm = (props) =>
{

    const [signin , setSignin] = useState({
        email       : "",
        password    : ""
    })

    const [isAuthorized, setIsAuthorized] = useState(false)

    const handleChange = ({currentTarget: Input})=>
    {
        setSignin({...signin,[Input.name] : Input.value});
    }

    const handleSubmit = async (e)=>
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
        
        //console.log(url)
        // const posts = new Promise((value)=>{

        // }, (error)=> {

        // })
        // posts.
        await axios.get(url).then(value => 
        {
            setIsAuthorized(true)

            let fullName = value.data.full_name;
            let email = value.data.email;
            let loggedStatus = true;
            
            window.close();
        
            chrome.storage.local.set({loggedin: loggedStatus}, function() {
                console.log('Value is set to ' + loggedStatus);
              });

            chrome.storage.local.set({email: email}, function() {
                console.log('Value is set to ' + email);
              });

            chrome.storage.local.set({fullName: fullName}, function() {
                console.log('Value is set to ' + fullName);
              });

        }, error => {
            alert("wrong password")
        })
    }

    return (

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

