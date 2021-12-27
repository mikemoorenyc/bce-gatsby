

import React, { useState } from "react"

import * as styles from "./styles.module.scss";

import { HtmlStrip, truncateString } from "../../utilities"
import LazyImg from "../LazyImg";
import { Link } from "gatsby";
import { navigate, } from "gatsby"
import Svg from "../SVG";

import {
    fontSans,
    noUnderline,
    tagLine
 } from "../../global-styles/utilities.module.scss"
 const {
    card,
    imgContainer,
    kickerStyle,    
    textArea,
    h2,
    
} = styles;

const ThumbImage = ({featuredImage}) => {
    if(!featuredImage) {
        return null;
    }
    const {
        databaseId
    } = featuredImage.node
   
    return (
        <div className={imgContainer}>
            <LazyImg 
                    isPoster={true}
                    databaseId={databaseId}
                    />
        </div>
    )
} 




export default function Card(props) {

    const {featuredImage,title, link, kicker, desc,  externalLink, extraClasses, styleMod} = props
    const ctaText = props.ctaText || "View post"; 

    const Cta = () => <div className={`${fontSans} ${styles.ctaText}`}><span>{ctaText}</span><Svg icon={"arrow"} /></div>

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
        <ThumbImage featuredImage={featuredImage} />
        <div className={textArea}>
        {(kicker)?<div className={`${kickerStyle} ${fontSans}`}>{kicker}</div>: null}
        <h2 className={h2}>{(link)?<Link className={`${noUnderline} normal-hover`} to={link}>{title}</Link>:title}</h2>
        {(desc)?<div className={`${tagLine}`}>{truncateString(HtmlStrip(desc),75)}</div>: null}
       
        </div>
         <Cta />

    </div>
}