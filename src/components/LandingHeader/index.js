import PropTypes from "prop-types"

import { Fragment } from "react";
import React from "react";
import parse from "html-react-parser";

import {
    articleHeading,
    contentCenterer,
    gridLayout,
    tagLine
} from "../../global-styles/utilities.module.scss"
import {
    excerpt,
    landingHeaderRule,
    landingHeaderTitle
} from "./styles.module.scss";

const LandingHeader = ({pageTitle, copy}) => {

    return (
        <Fragment>
        <div className="gl-mod landing-header  media-item">
  <div className={`${contentCenterer} ${gridLayout}`}>
    <h1 className={`${landingHeaderTitle} ${articleHeading}`}>{pageTitle}</h1>

    {
        (copy)? <div className={`${excerpt} ${tagLine}`}>{parse(copy)}</div> : null
    }
    
   
  </div>

</div>
<hr className={landingHeaderRule}/>
        </Fragment>

    )
}
LandingHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    copy: PropTypes.string
}
export default LandingHeader
