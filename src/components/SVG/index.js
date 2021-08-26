import React from "react";


export default function SVG({icon}) {
    let svg = null;
    switch(icon) {
        case "x":
          svg = <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>          
          break;
        case "menu":
          svg = <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
          
          break;
        default:
          
    }
    return svg; 
}