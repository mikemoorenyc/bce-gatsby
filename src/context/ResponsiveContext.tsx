import React from "react";
import { middleCenter } from "src/global-styles/utilities.module.scss";
import { textChangeRangeIsUnchanged } from "typescript";

const ResponsiveContext = React.createContext({screenSize: null}); 

class ResponsiveContextProvider extends React.Component {
    state = {
        screenSize: null
    }
    
    updateScreensize = () => {
       
        let ss = "mobile"
        if(window.innerWidth > 760) {
            ss = "tablet"
        }
        if(window.innerWidth > 1014) {
            ss = "desktop"
        }
        if(ss !== this.state.screenSize) {
            this.setState({screenSize:ss})
        }
        
    }
    componentDidMount() {
        this.updateScreensize();
      
        window.addEventListener("resize",this.updateScreensize);
    }
    componentWillUnmount() {
        window.removeEventListener("resize",this.updateScreensize)
    }
    render() {
        return <ResponsiveContext.Provider value={{screenSize:this.state.screenSize}}>
            {this.props.children}
        </ResponsiveContext.Provider>
    }
}
export default ResponsiveContext
export {ResponsiveContextProvider}