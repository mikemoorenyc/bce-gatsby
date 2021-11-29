

import React, { useState } from "react"

import * as styles from "./styles.module.scss";

import { HtmlStrip, truncateString } from "../../utilities"
import LazyImg from "../LazyImg";
import { Link } from "gatsby";
import { navigate, } from "gatsby"
import {
    card,
    imgContainer,
    kickerStyle,    
    textArea,
    h2
} from "./styles.module.scss";
import {
    fontSans,
    noUnderline,
    tagLine
 } from "../../global-styles/utilities.module.scss"







export default function Card(props) {
    const {title, link, kicker, desc,  sourceUrl, externalLink, extraClasses, styleMod} = props
    

    const [downTime, setDownTime] = useState(0);


    const cardClick = (e) => {
     
        if(e.button !== 0) {
            return ;
        }
        if( e.type === "mousedown") {
            setDownTime(+new Date());
            return
        }
        
        if ((+new Date() - downTime) > 200) {
            return ;
        }
        if(externalLink) {
            window.location.href = link;
            return ; 
        }
        e.preventDefault() ; 
        navigate(link);
    }
  
    
    return <div role="presentation" onMouseDown={cardClick} onMouseUp={cardClick} className={`${card} ${(styleMod)? styles[styleMod]: ""} ${extraClasses}  `}>
        {
            (!sourceUrl)?"":
          <div className={imgContainer}>    <LazyImg {...props} isPoster={true}/></div>
        }
        <div className={textArea}>
        {(kicker)?<div className={`${kickerStyle} ${fontSans}`}>{kicker}</div>: null}
        <h2 className={h2}>{(link)?<Link className={noUnderline} to={link}>{title}</Link>:title}</h2>
        {(desc)?<div className={`${tagLine}`}>{truncateString(HtmlStrip(desc),75)}</div>: null}
        </div>

    </div>
}