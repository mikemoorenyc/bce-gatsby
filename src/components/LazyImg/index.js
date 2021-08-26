import React from "react";
import { Fragment,useRef ,useState,useEffect} from "react";
import {
    fakeImg,
    bg
} from "./styles.module.scss";
import {
    posterImg
} from "../../global-styles/utilities.module.scss"



export default function LazyImg({srcSet,sourceUrl,sourceHeight, sourceWidth,alt, addClasses, isPoster}) {
    const fakeDom = useRef(null);
    const [inView, updateView] = useState(false);
    const observer = new IntersectionObserver(onChange);
    function onChange(changes){
        changes.forEach(change => {
            if(change.isIntersecting) {
                updateView(true);
                observer.disconnect(); 
            }
            
        })
    }
    
    useEffect(()=>{
       
        observer.observe(fakeDom.current);
        return () => {
            if(!inView) {
                observer.disconnect(); 
            }
        }
    },[])

    return (
        <Fragment>
            {
            (!inView) ?  <div ref={fakeDom} className={(isPoster)? `${posterImg} ${bg}` : `${fakeImg} ${bg} ${addClasses}`} style={{
                paddingTop: (isPoster)?"" : ((sourceHeight/sourceWidth) * 100)+"%"
            }} /> : 
                <img srcSet={srcSet} alt={alt} src={sourceUrl} className={addClasses || ""} />
            }
        </Fragment>
        
    )
}