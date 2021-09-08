import React, { useState } from "react"
import { navigate,  } from "gatsby"
import { Link } from "gatsby";
import { HtmlStrip } from "../../utilities"
import LazyImg from "../LazyImg";
import {
    card,
    textArea,
    kickerStyle,
    imgContainer
} from "./styles.module.scss";
import {
    boxShadow,
    bsTrans,
    noUnderline,
    fontSans,
    tagLine
} from "../../global-styles/utilities.module.scss"

export default function Card(props) {
    const {title, link, kicker, desc, srcSet, altText, sourceUrl, externalLink, extraClasses} = props
    console.log(props);

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
  
    function truncateString(str, num) {
        if (str.length <= num) {
          return str
        }
        return str.slice(0, num) + '...'
      }
    return <div onMouseDown={cardClick} onMouseUp={cardClick} className={`${card} ${extraClasses}  `}>
        {
            (!sourceUrl)?"":
          <div className={imgContainer}>  <LazyImg {...props} isPoster={true}/></div>
        }
        <div className={textArea}>
        {(kicker)?<div className={`${kickerStyle} ${fontSans}`}>{kicker}</div>: null}
        <h2>{(link)?<Link className={noUnderline} to={link}>{title}</Link>:title}</h2>
        {(desc)?<div className={`${tagLine}`}>{truncateString(HtmlStrip(desc),100)}</div>: null}
        </div>

    </div>
}