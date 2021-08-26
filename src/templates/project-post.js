import React from "react"
import Layout from "../components/Layout"
import LazyImg from "../components/LazyImg";
import {
  topHero,
  topInfo,
  projectTag
} from "./styles/project.module.scss";
import {
  posterContainer,
  posterImg,
  articleHeading,
  tagLine
} from "../global-styles/utilities.module.scss"
import { HtmlStrip } from "../utilities";
import { Fragment } from "react";

import { graphql } from "gatsby"

export default function ProjectPost({ data }) {
    const {wpProject} = data
    const featuredImage = data.wpProject.featuredImage.node
    const {mediaDetails} = data.wpProject.featuredImage.node;
    const TopLinks = ({links}) => {
      console.log(links)
      const lArray = links.split(/\r?\n/).map(l => l.split(",") )
      return (
        <div>
          <h3>Links</h3>
          {
            lArray.map((l,i)=> {
              return (
                <Fragment>
                  {(i !== 0)? <Fragment>, </Fragment>: "" }
                  <a href={l[1]}l>{l[0]}</a>
                </Fragment>
              )
            })
          }
        </div>
      )
    
    }   
    console.log(wpProject.toplinks)
  return (
  <Layout pageTitle={data.wpProject.title} activeMenu={"Projects"}>
    <div className={topHero}>
      {
        (wpProject.featuredImage) ?<div className={`${topHero} ${posterContainer}`}> <LazyImg 
                                        sizes={mediaDetails.sizes} 
                                        srcSet={featuredImage.srcSet}
                                        isPoster={true} 
                                        sourceUrl={featuredImage.sourceUrl}
                                        sourceHeight={mediaDetails.height}
                                        sourceWidth={mediaDetails.width}
                                        alt={featuredImage.altText}
                                        addClasses={`${posterImg}`}
                                        /> </div>: ""
      }
      </div>
      <div className={topInfo}>
        <h1 className={`${articleHeading}`}>{wpProject.title}</h1>
        <h2 className={`${tagLine} ${projectTag}`}>{HtmlStrip(wpProject.excerpt)}</h2>
        {(wpProject.toplinks)? <TopLinks links={wpProject.toplinks} />: ""}
        {wpProject.content}
      </div>
  </Layout>
  
  )
}
export const query = graphql`
  query($slug: String!) {
    wpProject(slug: {eq: $slug}) {
      content
      title
      whatilearned
      toplinks
      tags {
        nodes {
          slug
          name
        }
      }
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
        }
      }
    }
  } 
`

