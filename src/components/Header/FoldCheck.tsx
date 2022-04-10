import React, { useContext, useLayoutEffect ,useRef} from "react";
import FoldContext from "../../context/FoldContext"

const FoldCheck = () => {
    const foldFunctions = useContext(FoldContext);
    const headerCheck = useRef(null);
    useLayoutEffect(()=> {
        if(!headerCheck.current) {
            return; 
        }
        const observer = new IntersectionObserver((changes)=> {
            changes.forEach(change => {
                if(change.isIntersecting) {
                    foldFunctions.toggleFold(false)
                } else {
                    foldFunctions.toggleFold(true)
                }   
            })
        })
        observer.observe(headerCheck.current);
        return () => {
            observer.disconnect(); 
        }
    },[])
    return <div ref={headerCheck} aria-hidden id={"main"} style={{width: "100%", height: "1px"}}/>
}

export default FoldCheck