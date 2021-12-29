import React from "react"
import {
    fontSans
} from "../../global-styles/utilities.module.scss"
import {
    figcaption
} from "./imageStyles.module.scss"
const FigCaption = ({children}) => {
    return <figcaption className={`${figcaption} ${fontSans}`}>{children}</figcaption>
}
export default FigCaption;