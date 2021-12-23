
import React from "react"
import {domToReact} from "html-react-parser"
import LazyImg from "../LazyImg";




import {
    figcaption,
    stdImg
} from "./imageStyles.module.scss";

import {
    fontSans,
    thinBox
} from "../../global-styles/utilities.module.scss"

export default function CopyImage({node}) {
    
   
    
    function getdbId(classList) {
        let cArray = classList.split(" ");
        let imgClass = cArray.filter(e => e.includes("wp-image"));
        if (imgClass.length < 1) {
            return ;
        }
        let dbnumb = imgClass[0].split("-");
        return parseInt(dbnumb[dbnumb.length - 1])
        
    }
    const classes = node.attribs.class || "";
    let caption = node.children.filter(c => c.name === "figcaption")[0] || null;
    let img = node.children.filter(c => c.name === "img")[0] || null;
    
    
    if (!img) {
        return null; 
    }
    

    
    return <figure className={`${classes}`}>
        <div className={`${stdImg} `}><LazyImg databaseId={getdbId(img.attribs.class)} addClasses={thinBox} /></div>
        {(caption)? <figcaption className={`${figcaption} ${fontSans}`}>{domToReact(caption.children)}</figcaption>: ""}
    </figure>
} 