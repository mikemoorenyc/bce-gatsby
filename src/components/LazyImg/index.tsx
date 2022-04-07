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
interface ImageBase {
    addClasses?:string, 
    isPoster?:boolean,
    optionalWidth?: number,
    optionalAlt?:string
}
interface ImageLayout extends ImageBase {
    
    imgData: {
        altText?:string,
        localFile: {
            childImageSharp: {
                gatsbyImageData: {
                    width: number,
                    height: number,
                    images: {
                        fallback: {
                            src: string,
                            srcSet: string
                        }
                        sources: {type:string,srcSet:string}[]                       
                    }
                }
            }
        }
    }
}

const LazyLayout = ({addClasses,isPoster,imgData, optionalWidth, optionalAlt}:ImageLayout) => {
    let {width,height,images} = imgData.localFile.childImageSharp.gatsbyImageData;
    
    let spacerPadding =  ((height/width) * 100)+"%"
    width = optionalWidth || width;
    const maxWidthStyle = (!isPoster)? {maxWidth: width} : {};
    
    const {srcSet,src} = images.fallback
    const {sources} = images; 
    const altText = imgData.altText || optionalAlt || src;
    let webpSources = null;
    

    if(sources && sources.length) {
        webpSources = sources.find(e=> e.type === "image/webp") || null; 
    }
    
    
    const fakeDom = useRef(null);
    const [inView, updateView] = useState(false);
    const [imageLoaded,updateLoaded] = useState(false);
    useLayoutEffect(()=>{
        if(imageLoaded || !fakeDom.current) {
            return;
        }
        const domObserver = fakeDom.current
        const observer = new IntersectionObserver(onChange);
        function onChange(changes: any[]){
            changes.forEach(change => {
                if(change.isIntersecting) {
                    updateView(true);
                    observer.unobserve(domObserver)
                    observer.disconnect(); 
                }
            })
        }
        observer.observe(domObserver);
        return () => {  
            observer.unobserve(domObserver);
            observer.disconnect(); 
        }
    },[])

   


    return <Fragment>
    {
    ( !imageLoaded) ?  <div 
            ref={fakeDom} 
            className={(isPoster)? `${posterImg} lazy-gradient` : `${fakeImg} lazy-gradient ${addClasses}`} 
            style={(!isPoster)?maxWidthStyle:undefined} >
                <img 
                    alt={altText } 
                    src={blankSVG} 
                    style={{width: "100%",height:0,paddingTop: (isPoster)?"" :spacerPadding}}/>
            </div> : null
        
    }
    {
        (inView) ? (
            <picture className={(!imageLoaded)?notLoaded : ""}>
                {(webpSources)?<source srcSet={webpSources.srcSet} type="image/webp" />: null}
                <source srcSet={srcSet}  />
                <img onLoad={()=>{updateLoaded(true)}}  alt={altText} src={src} className={`${(!imageLoaded) ? notLoaded : ""} ${addClasses || ""} ${(isPoster)? posterImg : ""}`} style={{width: "100%", ...maxWidthStyle }}/> 
            </picture>
        ) : null
    }
</Fragment>
}
interface ImageProps extends ImageBase {
    databaseId: number
}

export default function LazyImg(props: ImageProps) {
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
    
    let theImg = data.allImgs.nodes.find((e: {databaseId:number})=>e.databaseId === databaseId);
    if(!theImg) {
        return null; 
    }
    
    

    return <LazyLayout imgData={theImg} {...props} />; 
   
}