import React from "react";

const AllAnotation = () => 
{
  function highlight()
  {
    alert("Annotations in This Page is about to appear now")
  }

    return (

            <div className="fashion-studio-border pt-2" style={{ marginTop: "10px" }}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              {/* ()=>highlight() */}
              <a href="#">
                <span className="fashion-studio" onClick={highlight}>Annotations in This Page</span>
              </a>
            </div>

    )
}

export default AllAnotation;