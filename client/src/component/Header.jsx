import React from "react";

function Header() {
    return(
        <div className="header">
          <h1>TODO</h1>
          <button className="dark-mode-btn"><img src="/images/icon-sun.svg" alt="sun icon" /></button>
        </div>
    );
}

export default Header;