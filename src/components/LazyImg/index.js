import React from "react";

import { Fragment, useLayoutEffect, useRef, useState } from "react";
import {
    bg,
    fakeImg,
    notLoaded
} from "./styles.module.scss";
import blankSVG from "../../assets/img-bg.svg";

import {
    posterImg
} from "../../global-styles/utilities.module.scss"

export default function LazyImg({srcSet,sourceUrl,sourceHeight, sourceWidth,altText, addClasses, isPoster}) {
    const fakeDom = useRef(null);
    const [inView, updateView] = useState(false);
    const [imageLoaded,updateLoaded] = useState(false);
    
    
    useLayoutEffect(()=>{
        
        const observer = new IntersectionObserver(onChange);
        function onChange(changes){
            changes.forEach(change => {
                if(change.isIntersecting) {
                    updateView(true);
                    observer.disconnect(); 
                }
            })
        }
        observer.observe(fakeDom.current);
        return () => {  
            observer.disconnect(); 
        }
    },[])

    return (
        <Fragment>
            {
            ( !imageLoaded) ?  <div 
                    ref={fakeDom} 
                    className={(isPoster)? `${posterImg} lazy-gradient` : `${fakeImg} lazy-gradient ${addClasses}`} style={{
                
                maxWidth: (!isPoster)? sourceWidth : null 
            }} > <img alt={altText || sourceUrl} src={blankSVG} style={{width: "100%",height:0,paddingTop: (isPoster)?"" : ((sourceHeight/sourceWidth) * 100)+"%"}}/></div> : null
                
            }
            {
                (inView) ? <img onLoad={()=>{updateLoaded(true)}} srcSet={srcSet}  alt={altText || sourceUrl} src={sourceUrl} className={`${(!imageLoaded) ? notLoaded : ""} ${addClasses || ""} ${(isPoster)? posterImg : ""}`} style={{width: "100%",maxWidth: (!isPoster)? sourceWidth : null }}/> : null
            }
        </Fragment>
        
    )
}