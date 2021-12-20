import { Link, graphql } from "gatsby";
import Layout from "../../components/Layout"
import LandingHeader from "../../components/LandingHeader";
import React, { useEffect, useState } from "react";
import { HtmlStrip } from '../../utilities'
import {BlogCopy} from "../../components/BlogItem";
import Pagination from "../../components/Pagination";
import LazyImg from "../../components/LazyImg";
import {
  blogItemPadding,
  blogLandingCopy,
  blogLandingImage,
  landingFullWidth,
  blogItemInner
} from "./blogstyles.module.scss";
import {
  blogItem ,

} from "../../components/BlogItem/styles.module.scss"
import {
  thinBox,
  posterContainer,
  posterImg
} from "../../global-styles/utilities.module.scss";

export default function BlogLanding({data,pageContext}) {

    const [wideView,updateView] = useState(false);

    const {numPages, currentPage} = pageContext;
    const posts = data.allWpPost.edges
    const prevPage = (currentPage <= 2) ? "" : (currentPage - 1).toString(); 
    const {pageInfo} = data 
    useEffect(()=>{
      if(window.innerWidth > 760) {
        updateView(true)
      } else {
        updateView(false)
      }
      const sizeCheck = (e) => {
        if(window.innerWidth > 760) {
          updateView(true)
        } else {
          updateView(false)
        }
      }
      window.addEventListener("resize",sizeCheck);
      return () => {
        window.removeEventListener("resize",sizeCheck);
      }
    })
    return <Layout 
              activeMenu={"Writing"}
              pageTitle={pageInfo.title} 
              headerLink={pageInfo.link}
              headerDescription={HtmlStrip(pageInfo.content)}>
                <LandingHeader pageTitle={pageInfo.title} copy={pageInfo.content} />
                <div>
                {posts.map(( {node} ) => {
                  return <article key={node.slug} className={`${blogItem} ${blogItemPadding} `}>
                    <div className={blogItemInner}>
                      <div className={`${blogLandingCopy} ${(!node.featuredImage) ? landingFullWidth:""}`}>
                      <BlogCopy {...node} />
                      </div>
                      {(node.featuredImage && wideView)?
                      <Link to={node.link} className={` ${blogLandingImage} ${thinBox} ${posterContainer}`} style={{paddingTop: "56.25%"}}>
                          <LazyImg 
                sizes={node.featuredImage.node.mediaDetails.sizes} 
                srcSet={node.featuredImage.node.localFile.childImageSharp.fluid.srcSet}
                isPoster={true} 
                sourceUrl={node.featuredImage.node.sourceUrl}
                sourceHeight={node.featuredImage.node.localFile.childImageSharp.fixed.height}
                sourceWidth={node.featuredImage.node.localFile.childImageSharp.fixed.width}
                altText={node.featuredImage.node.altText}
                addClasses={`${posterImg}`}
                />
                      </Link>
                      :null}
                    </div>
                  </article>
                })}
                </div>
                <Pagination 
                  prevLink={(currentPage !== 1) ? `/blog/${prevPage}` : null}
                  nextLink={(currentPage !== numPages) ?`/blog/${(currentPage + 1).toString()}`: null}
                />
        
    </Layout>
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    pageInfo : wpPage(slug: {eq: "blog"}) {
      content
      title
      link
    }
    allWpPost(sort: {fields: date, order: DESC}, limit: $limit, skip: $skip) {
        totalCount
        edges {
          node {
            title
            slug
            link
            date(fromNow: true)
            excerpt
            featuredImage {
              node {
                mediaDetails {
                  sizes {
                    sourceUrl
                    height
                    width
                    name
                  }
                  width
                height
                }
                sourceUrl
                srcSet
                altText
                localFile {
                  childImageSharp {
                    fixed {
                      src
                      width
                      height
                    }
                    fluid {
                      srcSet
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    
  } 
`