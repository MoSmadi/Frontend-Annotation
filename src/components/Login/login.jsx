import React from "react";
// import backward from "../../images/previous.png";
import close from '../../images/close.png';
import * as Components from "./Components";
import SignupForm from './registration/registrationForm';
import SigninForm from './signingIn/signingInForm';
import "./login.css";

function Login(props) 
{
  const [signIn, toggle] = React.useState(true);



//   const [signup , setSignup] = React.useState({
//     fullName    : "",
//     phoneNumber : "",
//     email       : "",
//     Password    : ""
// })
// const handleChange = ({currentTarget: Input})=>
// {
//   setSignup({...signup,[Input.name] : Input.value});
// }

// const handleSubmit = async(e)=>
// {
//   e.preventDefault(); // prevent the form to act in the default way (dont refresh)

//   const registered =
//   {
//     full_name    : signup.fullName,
//     phone_number : signup.phoneNumber,
//     email       : signup.email,
//     password    : signup.Password
//   }
  
//     const url = "http://localhost:8001/api/users"
    
//     await axios.post(url,registered)
// }


const backButtonStyle = 
{
  cursor: "pointer",
  zIndex: 999,
  position: "absolute",
  borderColor: "transparent",
  top: "8px",
  right: "16px",
  width: "25px",
}

const backgroundStyle = 
{
  backgroundImage: `url("https://unsplash.it/1366/768?image=568")`,
}

// const secondeBackgroundStyle = 
// {
//   opacity: 0.9
// }


  return (
  <Components.Container style={backgroundStyle}>

    <img src={close} alt="close" style={backButtonStyle} />;

      <Components.SignUpContainer signingIn={signIn}>

        <SignupForm />

      </Components.SignUpContainer>


      <Components.SignInContainer signingIn={signIn}>
        
        <SigninForm />

      </Components.SignInContainer>

      
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>


          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>To keep connected with us please login with your personal info </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)} style={{ cursor: "pointer" }}>Sign In </Components.GhostButton>
          </Components.LeftOverlayPanel>


          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph> Enter your personal details and start annotate with us </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)} style={{ cursor: "pointer" }}> Sign Up </Components.GhostButton>
          </Components.RightOverlayPanel>


        </Components.Overlay>
      </Components.OverlayContainer>
      
    </Components.Container>
  );
}

export default Login;
