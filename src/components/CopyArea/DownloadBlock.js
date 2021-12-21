import React from "react";
import SmallButton from "../SmallButton";
import Svg from "../SVG"
import {
    dlButton
} from "./styles.module.scss";


const DownloadBlock =  ({node}) => {
    let href=null
    node.children.forEach(e => {
        if(e.name === "a" && e.attribs && e.attribs.href) {
            href = e.attribs.href;
            return false; 
        }
    });
    let cut = href.split("/")
    
    return <SmallButton extraClasses={dlButton} href={href}><span>{cut[cut.length - 1]}<Svg icon={"download"} /></span></SmallButton>
}
export default DownloadBlock;