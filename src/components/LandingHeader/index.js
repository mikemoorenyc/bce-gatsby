import React from "react";
import { Fragment } from "react";
import parse from "html-react-parser";
import {
    landingHeaderRule,
    landingHeaderTitle,
    excerpt
} from "./styles.module.scss";
import {
    articleHeading,
    contentCenterer,
    gridLayout,
    tagLine
} from "../../global-styles/utilities.module.scss"


export default function LandingHeader({pageTitle, copy}) {

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