
import React from "react";
import { useEffect, useState } from "react";
import {fontSans} from "../../global-styles/utilities.module.scss"

class AutoCheckLoader extends React.Component {
    constructor() {
        super();
        this.state.dotsVisible = 0;
        this.dots=[1,2,3];
        this.updater;
    }
    componentDidMount() {
        let dv = this.state.dotsVisible; 
        this.updater = setInterval(()=> {
            if(dv === dots[dots.length -1]) {
                dv = 0;
            } else {
                dv = dv+1
            }
            this.setState({dotsVisible: dv});
            
        },250)
    }
    componentWillUnMount() {
     clearInterval(this.updater);    
    }
    render({dotsVisible}) {
     
        return <div className={fontSans} >
                I&rsquo;m checking if you have access to this post {this.dots.map((e) => {
    return <span key={e} style={{display: (dotsVisible < e)? "none" : "inline"  }}>🤫</span>
        </div>
    }
    
}

/*
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
*/

export default AutoCheckLoader; 
