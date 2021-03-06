import React from "react";
import SmallButton from "../SmallButton";
import Svg from "../SVG"
import {
    dlButton
} from "./styles.module.scss";


const ButtonBlocks = ({node}) => {
    const btns = node.children.filter(e => e.attribs && e.attribs.class && e.attribs.class.includes("wp-block-button"));
    
    return <div>
        {
            btns.map((e,i)=>{
                let links = e.children.filter(a=>a.name === "a")
                if(!links.length) {
                    return null; 
                }
                let link = links[0],
                {attribs} = link;
                let isExternal = attribs.target && attribs.target==="_blank" ;
                return <SmallButton extraClasses={dlButton} key={i} href={(attribs.href||null)} external={isExternal}>
                    <span>{link.children[0].data}</span>
                    {(e.attribs.class.includes("download"))? <Svg icon="download" /> : ""}
                    {(isExternal && !e.attribs.class.includes("download"))? <Svg icon="external" />:""}
                    </SmallButton>
                
            })
        }
    </div>
}
export default ButtonBlocks;