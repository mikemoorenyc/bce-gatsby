import React from "react";

import {
    contentSkip
} from "./styles.module.scss"
import {
    noUnderline,
    fontSans,
    afterBlock
} from "../../../global-styles/utilities.module.scss"

const SkipContent = () => <a className={`${contentSkip} ${noUnderline} normal-hover ${fontSans} ${afterBlock}` } href="#main">Skip to content</a>


export default SkipContent