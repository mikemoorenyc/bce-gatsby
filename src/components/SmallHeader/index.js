import {
    fontSans,
    typeSmaller
} from "../../global-styles/utilities.module.scss";

import React from "react"
import {
    header
} from "./styles.module.scss";

export default function SmallHeader({size, copy, extraClasses}) {
    return React.createElement(`h${size || "2"}`, {className: `${header} ${fontSans} ${typeSmaller} ${extraClasses || ""}`}, copy);
}