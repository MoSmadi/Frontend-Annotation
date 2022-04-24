import React from "react";

const About = () => 
{
  const openPage = () =>
  {
    window.open("http://localhost:3000/#/about");
  }

    return (
      <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <span className="fashion-studio" onClick={openPage}>About</span>
        </a>
      </div>
    );
}

export default About;