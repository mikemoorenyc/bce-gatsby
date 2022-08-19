import React from "react"
import {domToReact} from "html-react-parser";
import SVG from "../SVG"
import {visionBoardStyle} from "./styles.module.scss";
console.log(visionBoardStyle)
const sections = [
    ["Product Vision", "eye"],
    ["Target Group", "group"],
    ["Needs", "heart"],
    ["Product","robot"],
    ["Business Goals", "flag"]
]
const Section = ({secnumb, content, spanner,width="25%"}) =>{
    const s = sections[secnumb];
    return <td style={{width: width}} colSpan={spanner|| null}>
        <h4><SVG icon={s[1]} /><span>{s[0]}</span></h4>
        {content}
        </td>
} 

const VisionBoard = ({node}) => {
    let {children} = node
    
    return <table className={visionBoardStyle}>
        <tr>
            <Section secnumb={0} content={domToReact(children[0].children)} spanner={4} width="auto"/>
        </tr>
        <tr>
        {
            children.map((e,i)=> {
                if(i === 0) {
                    return null
                }
                return <Section key={i} secnumb={i} content={domToReact(e.children)} />
            })
        }
        </tr>
        
    </table>
}

export default VisionBoard;