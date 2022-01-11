import React from "react";

import * as styles from "./styles.module.scss"
import Svg from "../SVG"
import { domToReact } from "html-react-parser";
import {
  beforeBlock,
  afterBlock
} from "../../global-styles/utilities.module.scss";
const Border = ({area}) => {
  return <div role="presentation" className={`${styles.pullQuoteBorder} ${beforeBlock} ${afterBlock} ${styles[area]}`} >
    <div className={styles.quoteIcon}><Svg icon={"quote"} /></div>
  </div>
}
const PullQuote = ({node}) => {
    console.log(node);
    node.children.forEach((e)=> {
      e.attribs.class = styles.pullquote;
    })
    return <div className={styles.pullQuoteContainer} >
        <Border area={"top"} />
       {domToReact(node.children)}
       <Border area={"bottom"} />
        </div>
}

export default PullQuote;