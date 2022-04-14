import React, { useContext, useEffect, useRef} from "react";
import DarkModeContext from "../../context/DarkModeContext";
import Svg from "../SVG"
import * as styles from "./styles.module.scss"

type ToggleProps = {
    format: "desktop" | "mobile"
}
const ColorModeToggle = ({format}:ToggleProps) => {
    const darkModeSettings = useContext(DarkModeContext);
    const {darkMode} = darkModeSettings;
    const colorClass = darkMode ? styles.darkMode : ""
    const label = darkMode ? "Switch to color mode" : "Switch to dark mode"

    const clickHandler = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(darkModeSettings.darkMode);
        darkModeSettings.modeSwitch(); 
        e.currentTarget.blur(); 
    }

    return  <div className={`${styles.container} ${colorClass}`}>
    <button onClick={clickHandler} arial-label={label} className={`${styles.slider} ${colorClass}`}>
        
       <span aria-hidden>
            <Svg icon={(!darkMode) ? "moon" : "sun"} /></span>
        
    </button>
</div>
}
/*
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
*/
export default ColorModeToggle;