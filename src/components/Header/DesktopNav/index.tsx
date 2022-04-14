import React from "react";
import { HeaderProps } from "..";
import NavItems from "../NavItems"
import {
    nav
} from "./styles.module.scss"
import ColorModeToggle from "../../ColorModeToggle";
const DesktopNav = (props:HeaderProps) => {
    const {siteTitle,siteDesc,menuItems} = props; 
    return <div>
        
        <NavItems {...props}  extraClasses={nav}>
            <ColorModeToggle format={"desktop"} />
        </NavItems>
        
    </div>
}

export default DesktopNav;