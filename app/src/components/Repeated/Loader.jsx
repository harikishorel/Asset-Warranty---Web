import React from "react";
import "./Loader.css";

function Loader() {
  return (
    <div className="Loader-cont">
      <div class="loader">
        <img
          class="image"
          src="https://www.linkpicture.com/q/logo_329.png"
          alt="Logo"
        />
        <div class="loader-third"></div>
      </div>
    </div>
  );
}

export default Loader;
