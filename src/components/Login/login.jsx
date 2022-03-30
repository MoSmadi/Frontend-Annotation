import React from "react";
// import backward from "../../images/previous.png";
import close from '../../images/close.png';
import * as Components from "./Components";
import SignupForm from './registration/registrationForm';
import SigninForm from './signingIn/signingInForm';
// import App from '../../App';
import "./login.css";

function Login(props) 
{
  const [signIn, toggle] = React.useState(true);

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

function handleChange(event)
  {
    props.onChange(!event.value)
  }

  return (
  <Components.Container style={backgroundStyle}>

    <img src={close} alt="close" style={backButtonStyle} onClick={() => {handleChange(props) }}/>;

      <Components.SignUpContainer signingIn={signIn}>

        <SignupForm {...props} />

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
