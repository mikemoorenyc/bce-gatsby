import React, { useContext , useState} from "react";
import ColorModeToggle from "../ColorModeToggle";
import Svg from "../SVG";
import {MenuItem} from "../../typings/interfaces"
import { Link } from "gatsby";
import parse from "html-react-parser"
import FoldContext from "../../context/FoldContext"
import ResponsiveContext from "../../context/ResponsiveContext";
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav";
import {
    fontSans,
    beforeBlock
} from "../../global-styles/utilities.module.scss"
import {
    header
} from "./styles.module.scss"
import Logo from "./Logo";
export interface HeaderProps {
    siteTitle: string,
    siteDesc? : any,
    menuItems: MenuItem[],
    current?: string
}

const Header = (props:HeaderProps) =>{
    const [mobileNavOpened,updateMobileNavState] = useState(false);
  
    const {screenSize} = useContext(ResponsiveContext);
    
    return <header className={header} id="top-header">
            <Logo {...props} />
     
            {(screenSize == "desktop" || screenSize=="tablet")? 
                <DesktopNav {...props} />:
                <MobileNav  {...props} />}
        
    </header>
} 
/*
const Header = ({siteTitle, siteDesc,menuItems}: HeaderProps) => {
    return <header id="top-header" role="presentation"  className={`${(menuOpen)?showMenu :""}`}>
    <div className={mainLogo}>
        <a  aria-label={siteTitle} href="/" className={`${spinner} ${beforeBlock} normal-hover`}><span style={{display:"none"}}>{siteTitle}</span></a>
        <div className={logoText} style={{display: (hideHeader)? "none": "" }}>
            <div className={topLogo}>
            <a className={`${noUnderline} normal-hover `}  href="/"><span className={`${title} ${fontSans}`}>{siteTitle}</span></a> 
            </div>
            <div className={`${topTagline}`}><a className={`${noUnderline} ${fwNormal} normal-hover`} href="/">{parse(siteDesc)}</a></div>
        </div>
    </div>
    
    <div className={scrim}></div>
    <nav className={nav}>
        <div className={lockup}>
            <div className={topLogo}>
                <a  href="/">
                    <span className={`${title} ${fontSans}`}>
                        {
                            siteTitle.split(" ").map((n,i) => (
                                <span key={i}>{n}</span>
                            ))
                        }

                    </span>
                 </a>
            </div>
            <div className={topTagline}><a className={fwNormal} href="/">{parse(siteDesc)}</a></div>
        </div>
        <div className={navItems}>
            {
            menuItems.map(n => (
                <div className={`${navItem} ${(n.label === activeMenu)?active : ""}`} key={n.id}>
                    <Link className={fwNormal} onClick={hamburgerClick} to={n.url}>{parse(n.label)}</Link></div>
              ))
            }
            <ColorModeToggle colorPicker={colorPicker} currentColor={favIconColor} switchFunction={updateColorMode} />
        </div>
        

    </nav>
    <button aria-label={menuOpen ? "Close Menu": "Open Menu"} ref={hamburgerDOM} onClick={(e)=>{e.preventDefault();hamburgerClick()}}  id="nav-opener" className={`${navOpener} ${beforeBlock} ${afterBlock}`}>
        <span className={middleCenter}><Svg icon={(menuOpen)? "x" : "menu"} /></span>     
    </button>
</header>
}
*/

export default Header;
