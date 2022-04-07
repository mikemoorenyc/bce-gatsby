
import React from "react";
import { useEffect, useState } from "react";
import {fontSans} from "../../global-styles/utilities.module.scss"



const dots = [1,2,3]
const AutoCheckLoader = () => {
    const [dotsVisible, updateDotsVisibleCount] = useState(0);
    useEffect(()=> {
        let dv = dotsVisible
        const dotRotator = setInterval(() => {
            if(dv === dots[dots.length -1]) {
                dv = 0;
            } else {
                dv = dv+1
            }
            
            updateDotsVisibleCount(dv );
        },250)
        return () => {
            clearInterval(dotRotator);
        }
    },[])
    return <div className={fontSans}>
        I&rsquo;m checking if you have access to this post {dots.map((e) => {
    return <span key={e} style={{display: (dotsVisible < e)? "none" : "inline"  }}>🤫</span>
})}
    </div>;  
}

export default AutoCheckLoader; 