import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import {  Fragment, useLayoutEffect, useRef, useState } from "react";
import {
    fakeImg,
    notLoaded
} from "./styles.module.scss";
import blankSVG from "../../assets/img-bg.svg";

import {
    posterImg
} from "../../global-styles/utilities.module.scss"
const LazyLayout = ({addClasses,isPoster,imgData, optionalWidth}) => {
    let {width,height,images} = imgData.localFile.childImageSharp.gatsbyImageData;
    const {altText} = imgData;
    let spacerPadding =  ((height/width) * 100)+"%"
    width = optionalWidth || width;
    
    const {srcSet,src} = images.fallback
    const {sources} = images; 

    let webpSources = null;

    if(sources && sources.length) {
        webpSources = sources.filter(e=> e.type === "image/webp"); 
    }
    webpSources = (webpSources.length) ? webpSources[0] : null; 
    
    const fakeDom = useRef(null);
    const [inView, updateView] = useState(false);
    const [imageLoaded,updateLoaded] = useState(false);
    useLayoutEffect(()=>{
        if(imageLoaded) {
            return;
        }
        const domObserver = fakeDom.current
        const observer = new IntersectionObserver(onChange);
        function onChange(changes){
            changes.forEach(change => {
                if(change.isIntersecting) {
                    updateView(true);
                    observer.unobserve(domObserver)
                    observer.disconnect(); 
                }
            })
        }
        observer.observe(domObserver);
        if(fakeDom) {
            
        }
        return () => {  
            observer.unobserve(domObserver);
            observer.disconnect(); 
        }
    },[])
    return <Fragment>
    {
    ( !imageLoaded) ?  <div 
            ref={fakeDom} 
            className={(isPoster)? `${posterImg} lazy-gradient` : `${fakeImg} lazy-gradient ${addClasses}`} style={{
        
        maxWidth: (!isPoster)? width : null 
    }} > <img alt={altText } src={blankSVG} style={{width: "100%",height:0,paddingTop: (isPoster)?"" :spacerPadding}}/></div> : null
        
    }
    {
        (inView) ? (
            <picture className={(!imageLoaded)?notLoaded : ""}>
                {(webpSources)?<source srcSet={webpSources.srcSet} type="image/webp" />: null}
                <source srcSet={srcSet} type="image/webp" />
                <img onLoad={()=>{updateLoaded(true)}}  alt={altText} src={src} className={`${(!imageLoaded) ? notLoaded : ""} ${addClasses || ""} ${(isPoster)? posterImg : ""}`} style={{width: "100%",maxWidth: (!isPoster)? width : null }}/> 
            </picture>
        ) : null
    }
</Fragment>
}
export default function LazyImg(props) {
    const {databaseId} = props;
    const data = useStaticQuery(
        graphql`
          query {
            allImgs : allWpMediaItem {
                nodes {
                    databaseId
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData(quality: 90)
                      }
                    }
                }
              }
          }
        `
    )
    if(!databaseId || !data.allImgs.nodes.length) {
        return null ; 
    }
    
    let theImg = data.allImgs.nodes.filter(e=>e.databaseId === databaseId);
    if(!theImg.length) {
        return null; 
    }
    theImg = theImg[0]
    

    return <LazyLayout imgData={theImg} {...props} />; 
    /*return (
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
        
    )*/
}