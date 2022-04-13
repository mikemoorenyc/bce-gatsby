import React from "react";
import Svg from "../../../SVG"
import {
    beforeBlock, 
    afterBlock,
    middleCenter
} from "../../../../global-styles/utilities.module.scss"
import {
    navOpener
} from "./styles.module.scss";
const MobileMenuToggle = ({mobileNavOpened,updateFunc}:{mobileNavOpened:boolean, updateFunc: Function}) => {
    
    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        updateFunc(!mobileNavOpened);
        e.currentTarget.blur(); 
    }
    return <button aria-label={mobileNavOpened ? "Close Menu": "Open Menu"} onClick={clickHandler}  id="nav-opener" className={`${navOpener} ${beforeBlock} ${afterBlock}`}>
    <span role="presentation" aria-hidden className={middleCenter}><Svg icon={(mobileNavOpened)? "x" : "menu"} /></span>     
</button>
}

export default MobileMenuToggle