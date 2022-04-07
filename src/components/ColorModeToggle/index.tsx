import React, { useEffect, useRef} from "react";
import Svg from "../SVG"
import {
    container,
    slider,
    darkMode,
    fakeLabel
} from "./styles.module.scss"

type ToggleProps = {
    currentColor:string,
    switchFunction: Function,
    colorPicker: Function
}
const ColorModeToggle = ({currentColor, switchFunction,colorPicker}:ToggleProps) => {
    
    const btnEl = useRef<HTMLButtonElement>(null);
    
    let dm = currentColor === "white",
        colorClass = (dm) ? darkMode : "",
        label = (dm) ? "Switch to color mode" : "Switch to dark mode",
        bgColor = (!dm) ? currentColor : "";
    const btnClick = (e:React.MouseEvent) => {
        e.preventDefault();
        switchFunction( (dm) ? colorPicker() : "white" )
        if(btnEl.current) {
            btnEl.current.blur();
        }
    }
    useEffect(()=>{
        //updateDM(currentColor);
    },[currentColor])
    return  <div className={`${container} ${colorClass}`}>
                <button ref={btnEl} onClick={btnClick} style={{color: bgColor}}  arial-label={label} className={`${slider} ${colorClass}`}>
                    <span className={fakeLabel}>{label}</span>
                   
                        <Svg icon={(!dm) ? "moon" : "sun"} />
                    
                </button>
            </div>
}
export default ColorModeToggle;