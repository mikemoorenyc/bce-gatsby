import React, {FunctionComponent} from "react";
import { Link } from "gatsby";
import { MenuItem } from "../../../typings/interfaces";
import { noUnderline } from "../../../global-styles/utilities.module.scss";
type NavProps = {
    current?:string,
    menuItems:MenuItem[],
    extraClasses?:string,
}
const NavItems :FunctionComponent<NavProps> = ({children,menuItems, extraClasses,current}) => {
    return <nav className={`${extraClasses || ""}`}>
        <ul>
            {menuItems.map(e => <li key={e.id}><Link className={(e.label != current)?noUnderline:""} to={e.url}>{e.label}</Link></li>)}
        </ul>
        {children}
    </nav>
}

export default NavItems