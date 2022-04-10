import React, { useContext } from "react";
import { HeaderProps } from "..";
import {
    fwNormal, 
    fontSans,
    beforeBlock,
    noUnderline
} from "../../../global-styles/utilities.module.scss"
import {
    spinner,
    mainLogo,
    logoText,
    topLogo,
    topTagline,
    title
} from "./styles.module.scss";
import FoldContext from "../../../context/FoldContext";
import ResponsiveContext from "../../../context/ResponsiveContext";
const Logo = ({siteDesc,siteTitle}:HeaderProps) => {
    const {belowHeader} = useContext(FoldContext)
    const {screenSize} = useContext(ResponsiveContext);
    return <div className={mainLogo}>
    <a  aria-label={siteTitle} href="/" className={`${spinner} ${beforeBlock} normal-hover`}><span style={{display:"none"}}>{siteTitle}</span></a>
    <div className={logoText} style={{display: (belowHeader)?"none":"block"}}>
        <div className={topLogo}>
        <a className={`${noUnderline} normal-hover `}  href="/"><span className={`${title} ${fontSans}`}>{siteTitle}</span></a> 
        </div>
        {(screenSize!="mobile")?<div className={`${topTagline}`}><a className={`${noUnderline} ${fwNormal} normal-hover`} href="/">{siteDesc}</a></div>:""}
    </div>
</div>
}


export default Logo