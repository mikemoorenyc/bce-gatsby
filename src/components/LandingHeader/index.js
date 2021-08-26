import React from "react";
import { Fragment } from "react";
import {
    landingHeaderRule,
    landingHeaderTitle
} from "./styles.module.scss";
import {
    articleHeading,
    contentCenterer
} from "../../global-styles/utilities.module.scss"


export default function LandingHeader({pageTitle, content}) {
    return (
        <Fragment>
        <div className="gl-mod landing-header  media-item">
  <div className={contentCenterer}>
    <h1 className={`${landingHeaderTitle} ${articleHeading}`}>{pageTitle}</h1>

    {
        (content)? <div className="landing-header__excerpt tagline">{content}</div> : null
    }
    
   
  </div>

</div>
<hr className={landingHeaderRule}/>
        </Fragment>

    )
}