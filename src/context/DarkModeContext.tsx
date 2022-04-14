import React from "react";
import { graphql, useStaticQuery} from "gatsby";

type DarkModeType = {
    color: undefined | string, 
    colors: string[],
    getColors: Function,
    darkMode: undefined|boolean,
    modeSwitch: Function
}
const defaultState : DarkModeType = {
    color:undefined,
    colors: [],
    darkMode: undefined,
    modeSwitch: () => {},
    getColors: () => {}
}
const DarkModeContext = React.createContext(defaultState);



class DarkModeProvider extends React.Component {
    state = {
        color:undefined,
        colors:[],
        darkMode: undefined
    }
    colorPicker = () : string => {
        return this.state.colors[Math.floor(Math.random() * this.state.colors.length)]
    }
    getColors = (colorString:string) => {
        this.setState({
            colors: (colorString || "darkRed black").split(" ")
        },() => {
            this.colorModeInit();
        })
    }
    modeSwitch = () => {
        console.log(this.state);
        if(this.state.darkMode) {
            this.updateColorMode(this.colorPicker())
        } else {
            this.updateColorMode("white")
        }
    }
    updateColorMode = (color: string) => {
        this.setState({color:color});
        sessionStorage.setItem("current_color", color);
        const dm = (color === "white")
        this.setState({darkMode:dm});
        localStorage.setItem("dark_mode", dm ? "yes" : "no" );
        
    }
    colorModeInit() {
        let dm = localStorage.getItem("dark_mode");
        if(dm === "yes" || (!dm && (window.matchMedia && 
            window.matchMedia('(prefers-color-scheme: dark)').matches)) ) {
            this.updateColorMode("white");
            return; 
        }
        this.updateColorMode(this.colorPicker());
    }
    render() {
        
        return <DarkModeContext.Provider value= {{
            ...this.state,
            ...{
                modeSwitch:this.modeSwitch,
                getColors:this.getColors}
   
        }} >
            {this.props.children}
        </DarkModeContext.Provider>
    }
}

export default DarkModeContext
export {DarkModeProvider}