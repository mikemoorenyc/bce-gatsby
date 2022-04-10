

import React from "react";
const defaultState : ContextInterface = {
    belowHeader: false,
    toggleFold: (position:boolean) =>{},
}
interface ContextInterface  {
    belowHeader: boolean,
    toggleFold:any
}

const FoldContext = React.createContext(defaultState);


class FoldProvider extends React.Component {
    state = {
        belowHeader: false
    }
    toggleFold = (position:boolean) => {
        
        this.setState({belowHeader: position})
    }
    render() {
        
        return (<FoldContext.Provider
            value={{
                belowHeader:this.state.belowHeader,
                toggleFold:this.toggleFold
            }}
            >
            
            {this.props.children}
        </FoldContext.Provider>

        )
    }
}

export default FoldContext
export {FoldProvider}