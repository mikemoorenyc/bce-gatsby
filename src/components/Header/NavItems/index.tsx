import React from "react";
import { Link } from "gatsby";
import { MenuItem } from "../../../typings/interfaces";
import { noUnderline } from "../../../global-styles/utilities.module.scss";

const NavItems = ({menuItems, extraClasses,current}:{current?:string,menuItems:MenuItem[],extraClasses?:string}) => {
    return <nav className={`${extraClasses || ""}`}>
        <ul>
            {menuItems.map(e => <li key={e.id}><Link className={noUnderline} to={e.url}>{e.label}</Link></li>)}
        </ul>
    </nav>
}

export default NavItems