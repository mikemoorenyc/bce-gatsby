
import {
    li,

    tags
} from "./styles.module.scss";


import React from "react"
import SmallHeader from "../SmallHeader";
import SmallButton from "../SmallButton";
import parse from "html-react-parser"

export default function TagList({items, extraClasses}) {
    if(!items.length || typeof items !== "object") {
        return "";
    }


    return <div className={tags}>
        <SmallHeader size={3} copy={`Tagged`} />
        
        <ul >
            {
                items.map((e,i)=> <li className={li} key={e.slug}><SmallButton href={`/tagged/${e.slug}`}>{parse(e.name)}</SmallButton></li>)
            }
        </ul>
    </div>
}