
import React, { useLayoutEffect, useState } from "react";

import {fontSans} from "../../global-styles/utilities.module.scss"
const AutoCheckLoader = () => {
    const dots = [1,2,3];
    const [dotsVisible, updateDots] = useState(0);
    let dv = dotsVisible;
    const dotsCheck = () => {
        if(dv === dots[dots.length - 1]) {
            dv = 0;
        } else {
            dv = dv+1;
        }
        updateDots(dv)
    }
    useLayoutEffect(() => {
        const dotRotator = setInterval(()=> {
            dotsCheck(); 
        },250)
        return () => {
            clearInterval(dotRotator);
        }
    },[])
    return <div className={fontSans}>
        I&rsquo;m checking to see if you have access to this post {dots.map((e) => <span key={e} style={{display: (dotsVisible < e)? "none" : "inline"  }}>🤫</span>)}
    </div>
}

export default AutoCheckLoader; 
