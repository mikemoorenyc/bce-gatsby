import React from "react";
import { Link } from "gatsby";
import parse from "html-react-parser"

import {
   newfooter,
   newinner,
   newsocial
} from "./styles.module.scss";
import {
    fontSans,
    contentCenterer
} from "../../global-styles/utilities.module.scss"
import { arraySplit } from "../../utilities-typed";
import {MenuItem} from "../../typings/interfaces";
type FooterProps = {
    menuItems: MenuItem[],
    socialMediaLinks?: string
}


const Footer = ({menuItems,socialMediaLinks}:FooterProps) => {
    
    return <footer className={`${newfooter} ${fontSans} lazy-gradient`}>
    <div className={`${newinner} ${contentCenterer}`}>
        <div>Menu
        <ul className={`${newsocial} `}>
            {
                menuItems.map((n : MenuItem) => (
                    <li key={n.id}><Link to={n.url}>{parse(n.label)}</Link></li>
                 ))
             }
        </ul>
        </div>
        {
            (socialMediaLinks) ?<div>
               <div> Email &amp; Other Places
                <ul className={newsocial}>
                    {
                        arraySplit(socialMediaLinks).map((e,i)=> {
                            let item = arraySplit(e,",");
                            return <li key={i}>
                                <a href={item[1]} target="_blank" rel="noreferrer noopener">{item[0]}</a> 
                            </li>
                        })
                    }
                </ul>
            </div></div> : null
        }
        
    
    </div>
</footer>
}

export default Footer

