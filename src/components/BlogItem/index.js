import * as React from 'react'
import { Link } from 'gatsby';
import { Fragment } from 'react';
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
const BlogCopy = ({title,link,excerpt}) => {
    return <Fragment>
        <h3><Link to={link} className={noUnderline}>{title}</Link></h3>
   <div className={blogMeta}> {(excerpt) ? <div className={`${blogExcerpt} ${tagLine}`}>{truncateString(HtmlStrip(excerpt),75)}</div> : null} <Link className={`${blogReadMore} ${fontSans}`} to={link}>Read more</Link></div>
    </Fragment>
}
const BlogItem = ({title,link,excerpt,extraClasses}) => {
    return <article className={`${blogItem} ${extraClasses || ""}`} >
        <div>
        <BlogCopy title={title} link={link} excerpt={excerpt} />
  
        </div>
  </article>
}


export {BlogItem, BlogCopy}