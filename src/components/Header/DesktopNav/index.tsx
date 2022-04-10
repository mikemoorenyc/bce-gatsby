import React from "react";
import { HeaderProps } from "..";
import NavItems from "../NavItems"
import {
    nav
} from "./styles.module.scss"
const DesktopNav = (props:HeaderProps) => {
    const {siteTitle,siteDesc,menuItems} = props; 
    return <div>
        
        <NavItems {...props} extraClasses={nav}/>
    </div>
}

export default DesktopNav;