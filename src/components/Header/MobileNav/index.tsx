import React, { useContext, useState } from "react";
import NavItems from "../NavItems";
import MobileMenuToggle from "./MobileMenuToggle";
import ColorModeToggle from "../../ColorModeToggle";
import { HeaderProps } from "..";
import {
    scrim,
    navContainer,
    menuOpened,
    topLogo,
    title,
    topTagline,
    lockup,
    navStyles,
    darkMode
} from "./styles.module.scss"
import {
    fontSans,
    fwNormal
} from "../../../global-styles/utilities.module.scss"
import DarkModeContext from "../../../context/DarkModeContext";

const MobileNav = ({siteDesc,siteTitle,menuItems,current}:HeaderProps) =>{ 
    const [mobileNavOpened,updateMobileNavOpenState] = useState(false);
    const dmSettings = useContext(DarkModeContext)
    return(
    <>
    <MobileMenuToggle mobileNavOpened={mobileNavOpened} updateFunc={updateMobileNavOpenState}/>
    <div className={scrim} style={{display:(mobileNavOpened)?"block":"none"}} aria-hidden/>
    <div className={`${navContainer} ${(mobileNavOpened)?menuOpened:""} ${dmSettings.darkMode?darkMode:""}`}>
        <div aria-hidden className={lockup}>
            <div className={topLogo}>
                <div>
                    <strong><span className={`${title} ${fontSans}`}>
                        {
                            siteTitle.split(" ").map((n,i) => (
                                <span key={i}>{n}</span>
                            ))
                        }

                    </span></strong>
                </div>
            </div>
            <div className={topTagline}><span className={fwNormal} >{siteDesc}</span></div>
        </div>
        <NavItems menuItems={menuItems} current={current} extraClasses={navStyles}>
                        <ColorModeToggle format={"mobile"} />
        </NavItems>
    </div>
    </>
    )};


export default MobileNav
