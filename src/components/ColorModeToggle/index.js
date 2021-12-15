import React, { useEffect, useRef} from "react";
import SVG from "../../components/SVG"
import {
    container,
    slider,
    darkMode,
    fakeLabel
} from "./styles.module.scss"

export default ({currentColor, switchFunction,colorPicker}) => {
    //const [dm,updateDM] = useState(currentColor === "white")
    const btnEl = useRef(null);
    
    let dm = currentColor === "white",
        colorClass = (dm) ? darkMode : "",
        label = (dm) ? "Switch to color mode" : "Switch to dark mode",
        bgColor = (!dm) ? currentColor : "";
    const btnClick = (e) => {
        e.preventDefault();
        switchFunction( (dm) ? colorPicker() : "white" )
        btnEl.current.blur();
    }
    useEffect(()=>{
        //updateDM(currentColor);
    },[currentColor])
    return  <div className={`${container} ${colorClass}`}>
                <button ref={btnEl} onClick={btnClick} style={{color: bgColor}}  arial-label={label} className={`${slider} ${colorClass}`}>
                    <span className={fakeLabel}>{label}</span>
                   
                        <SVG role="presentation" icon={(!dm) ? "moon" : "sun"} />
                    
                </button>
            </div>
}