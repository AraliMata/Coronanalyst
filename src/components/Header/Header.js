import React from'react';
import './Header.css';
import logo from "../../imagenes/logo_coronanalyst_horizontal.png"



export default function Header() {
    return(
    <div id="main-header">
      <a >
        <img id="logo-header" src={logo}/>
      </a> 

    </div>
  );
}


