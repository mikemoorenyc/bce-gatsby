import React, {  useState } from "react"
import PropTypes from "prop-types"

import parse from "html-react-parser"
import { HtmlStrip, truncateString } from "../../utilities-typed"
import LazyImg from "../LazyImg";
import { Link } from "gatsby";
import { navigate, } from "gatsby"
import Svg from "../SVG";

import {
    fontSans,
    noUnderline,
    tagLine
 } from "../../global-styles/utilities.module.scss"
import {
    card,
    imgContainer,
    kickerStyle,    
    textArea,
    h2,
    cta,
    slim
} from "./styles.module.scss";
import { FeaturedImage,Card } from "src/typings/interfaces";

const ThumbImage = ({featuredImage}:{featuredImage:FeaturedImage}) => {
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

interface CC extends Card {

}


const CardComponent = ( {ctaText, featuredImage,title, link, kicker, desc,  externalLink, extraClasses, styleMod}:CC) => {

    const stylePick = (mod: "slim"|undefined) => {
        switch(mod) {
            case "slim":
                return slim;
            default:
                return null; 
        }
    }


    const [downTime, setDownTime] = useState(0);


    const cardClick = (e :React.MouseEvent<HTMLDivElement>) => {

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

    
    return <div role="presentation" onMouseDown={cardClick} onMouseUp={cardClick} className={`${card} ${stylePick(styleMod)} ${extraClasses}  `}>
        {(featuredImage)?<ThumbImage featuredImage={featuredImage} /> : null}
        <div className={textArea}>
        {(kicker)?<div className={`${kickerStyle} ${fontSans}`}>{kicker}</div>: null}
        <h2 className={h2}>{(link)?<Link className={`${noUnderline} normal-hover`} to={link}>{title}</Link>:title}</h2>
        {(desc)?<div className={`${tagLine}`}>{parse(truncateString(HtmlStrip(desc),75))}</div>: null}
       
        </div>
         <div className={`${fontSans} ${cta}`}><span>{ctaText}</span><Svg icon={"arrow"} /></div>

    </div>
}
CardComponent.defaultProps = {
    ctaText : "View Post" ,
    externalLink: false,
    extraClasses: ""
}
CardComponent.propTypes = {
    ctaText : PropTypes.string,
    featuredImage: PropTypes.shape({
        node: PropTypes.shape({
            databaseId : PropTypes.number
        })
    }),
    title : PropTypes.string.isRequired, 
    link : PropTypes.string.isRequired, 
    kicker : PropTypes.string, 
    desc : PropTypes.string,  
    externalLink : PropTypes.bool, 
    extraClasses : PropTypes.string, 
    styleMod : PropTypes.string
    

}
export default CardComponent; 