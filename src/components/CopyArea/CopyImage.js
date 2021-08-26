import React from "react"
import LazyImg from "../LazyImg";
import {domToReact} from "html-react-parser"
import {
    stdImg,
    figcaption
} from "./imageStyles.module.scss";
import {
    boxShadow,
    fontSans
} from "../../global-styles/utilities.module.scss"
export default function CopyImage({node}) {
    const classes = (node.attribs.class) ? node.attribs.class.split(" ")  : [];
    let caption = node.children.filter(c => c.name === "figcaption")[0] || null;
    let img = node.children.filter(c => c.name === "img")[0] || null;
    const {
        src,
        width,
        height,
        srcset,
        alt
    } = img.attribs;


    return <figure >
        <div className={`${stdImg} ${boxShadow}`}><LazyImg sourceUrl={src} alt={alt} sourceHeight={height} sourceWidth={width} srcSet={srcset} /></div>
        {(caption)? <figcaption className={`${figcaption} ${fontSans}`}>{domToReact(caption.children)}</figcaption>: ""}
    </figure>
} 