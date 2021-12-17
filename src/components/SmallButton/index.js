import React, { Fragment } from "react";
import { Link } from "gatsby";


import {fontSans, noUnderline} from "../../global-styles/utilities.module.scss"
import {tagLink} from "./styles.module.scss";

export default ({href,external,children, extraClasses}) => {
    if(!href) {
        return false; 
    }
    const styling = `${tagLink} ${fontSans} ${extraClasses} ${noUnderline}`
    

    if(external) {
        return <a className={styling} href={href} target="_blank" rel="noreferrer noopener">{children}</a>

    }
    return <Link to={href} className={styling}>{children}</Link>



}