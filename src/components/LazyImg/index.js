import React from "react";
import { Fragment,useRef ,useState,useLayoutEffect} from "react";
import {
    fakeImg,
    bg
} from "./styles.module.scss";
import {
    posterImg
} from "../../global-styles/utilities.module.scss"



export default function LazyImg({srcSet,sourceUrl,sourceHeight, sourceWidth,altText, addClasses, isPoster}) {
    const fakeDom = useRef(null);
    const [inView, updateView] = useState(false);
    
    
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
            (!inView) ?  <div ref={fakeDom} className={(isPoster)? `${posterImg} ${bg}` : `${fakeImg} ${bg} ${addClasses}`} style={{
                paddingTop: (isPoster)?"" : ((sourceHeight/sourceWidth) * 100)+"%"
            }} /> : 
                <img srcSet={srcSet} alt={altText} src={sourceUrl} className={`${addClasses || ""} ${(isPoster)? posterImg : ""}`} />
            }
        </Fragment>
        
    )
}