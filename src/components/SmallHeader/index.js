import {
    fontSans,
    typeSmaller
} from "../../global-styles/utilities.module.scss";
import PropTypes from "prop-types"
import React from "react"
import {
    header
} from "./styles.module.scss";

const SmallHeader = ({size, copy, extraClasses}) => {
    return React.createElement(`h${size.toString()}`, {className: `${header} ${fontSans} ${typeSmaller} ${extraClasses}`}, copy);
}

SmallHeader.defaultProps = {
 size: 2,
 extraClasses: ""
}

SmallHeader.propTypes = {
 size: PropTypes.number,   
 copy: PropTypes.string.isRequired,
 extraClasses : PropTypes.string
}
export default SmallHeader
