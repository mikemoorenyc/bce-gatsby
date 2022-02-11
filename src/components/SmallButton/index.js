import React from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";


import {fontSans, noUnderline, fwNormal} from "../../global-styles/utilities.module.scss"
import {tagLink} from "./styles.module.scss";

const SmallButton = ({href,external,children, extraClasses}) => {
    if(!href) {
        return false; 
    }
    const styling = `${tagLink} ${fontSans} ${extraClasses} ${noUnderline} ${fwNormal} normal-hover`
    

    if(external) {
        return <a className={styling} href={href} target="_blank" rel="noreferrer noopener">{children}</a>

    }
    return <Link to={href} className={styling}>{children}</Link>



}
SmallButton.defaultProps = {
    external: false,
    extraClasses: ""
}
SmallButton.propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    external: PropTypes.bool,
    extraClasses: PropTypes.string
}
export default SmallButton
