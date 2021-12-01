import * as React from 'react'
import { Link } from 'gatsby';
import {
    blogItem,
    blogMeta,
    blogReadMore,
    blogExcerpt
} from "./styles.module.scss";
import { truncateString, HtmlStrip } from '../../utilities';
import {
    fontSans,
    noUnderline,
    tagLine
} from "../../global-styles/utilities.module.scss";
export default ({title,link,excerpt,extraClasses}) => {
    return <article className={`${blogItem} ${extraClasses || ""}`} >
        <div>
  
    <h3><Link to={link} className={noUnderline}>{title}</Link></h3>
   <div className={blogMeta}> {(excerpt) ? <div className={`${blogExcerpt} ${tagLine}`}>{truncateString(HtmlStrip(excerpt),75)}</div> : null} <Link className={`${blogReadMore} ${fontSans}`} to={link}>Read More</Link></div>
        </div>
  </article>
}