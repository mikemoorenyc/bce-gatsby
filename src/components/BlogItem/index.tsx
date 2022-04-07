import * as React from 'react'
import { Link } from 'gatsby';
import { Fragment } from 'react';
import {item,meta,readMore,blogExcerpt} from "./styles.module.scss";
import { truncateString, HtmlStrip } from '../../utilities-typed';
import {
    fontSans,
    noUnderline,
    tagLine
} from "../../global-styles/utilities.module.scss";
interface Blog {
    title: string, 
    link: string, 
    excerpt?:string
}

const BlogCopy = ({title,link,excerpt}:Blog) => {
    return <Fragment>
        <h3><Link to={link} className={noUnderline}>{title}</Link></h3>
   <div className={meta}> {(excerpt) ? <div className={`${blogExcerpt} ${tagLine}`}>{truncateString(HtmlStrip(excerpt),140)}</div> : null} <Link className={`${readMore} ${fontSans}`} to={link}>Continue reading</Link></div>
    </Fragment>
}

interface BlogItemInterface extends Blog {
    extraClasses?: string
}
const BlogItem = ({title,link,excerpt,extraClasses}:BlogItemInterface) => {
    return <article className={` ${item} ${extraClasses || ""}`} >
        <div>
        <BlogCopy title={title} link={link} excerpt={excerpt} />

        </div>
  </article>
}


export {BlogItem, BlogCopy}