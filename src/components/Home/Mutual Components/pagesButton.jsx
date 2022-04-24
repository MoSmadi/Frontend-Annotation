import React from "react";

const AllPages = () => 
{
  const openPage = () =>
  {
    window.open("http://localhost:3000/#/table");
  }

    return (
      <div className="wishlist-border pt-2">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#">
          <span className="wishlist" onClick={openPage}>Websites used anottation</span>
        </a>
      </div>
    );
}

export default AllPages;