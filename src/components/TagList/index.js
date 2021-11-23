import {
    fontSans,
    noUnderline
} from "../../global-styles/utilities.module.scss";
import {
    li,
    tagLink,
    tags
} from "./styles.module.scss";

import { Link } from "gatsby";
import React from "react"
import SmallHeader from "../SmallHeader";

export default function TagList({items, extraClasses}) {
    if(!items.length || typeof items !== "object") {
        return "";
    }


    return <div className={tags}>
        <SmallHeader size={3} copy={`Tagged`} />
        
        <ul >
            {
                items.map((e,i)=> <li className={li} key={e.slug}><Link className={`${tagLink}  ${fontSans} ${noUnderline}`} to={`/tagged/${e.slug}`}>{e.name}</Link></li>)
            }
        </ul>
    </div>
}