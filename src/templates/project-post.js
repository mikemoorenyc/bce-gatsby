import React from "react"
import Layout from "../components/Layout"
import LazyImg from "../components/LazyImg";
import CopyArea from "../components/CopyArea";
import EndBullet from "../components/EndBullet";
import TagList from "../components/TagList";
import ReadingSection from "../components/ReadingSection";
import { arraySplit } from "../utilities";
import {
  topHero,
  topInfo,
  projectTag,
  topLinksClass,
  whatILearned
} from "./styles/project.module.scss";
import {
  posterContainer,
  posterImg,
  articleHeading,
  tagLine,
  fontSans,
  typeSmaller
} from "../global-styles/utilities.module.scss"
import { HtmlStrip } from "../utilities";
import { Fragment } from "react";

import { graphql } from "gatsby"



export default function ProjectPost({ data,pageContext }) {

    const {currentProject} = data

    const featuredImage =(currentProject.featuredImage)? currentProject.featuredImage.node :{}
    const {mediaDetails} = featuredImage ;
    
    const TopLinks = ({links}) => {

      const lArray = links.split(/\r?\n/).map(l => l.split(",") )
      return (
        <div className={`  ${topLinksClass} ${fontSans}`}>
          <h3>Links</h3>
          {
            lArray.map((l,i)=> {
              return (
                <Fragment key={i}>
                  {(i !== 0)? <Fragment>, </Fragment>: "" }
                  <a href={l[1]}>{l[0]}</a>
                </Fragment>
              )
            })
          }
        </div>
      )
    
    }   
  
  return (
  <Layout pageTitle={currentProject.title} activeMenu={"Projects"}>
    
      {
        (currentProject.featuredImage) ?<div className={topHero}><div className={`${topHero} ${posterContainer}`}> <LazyImg 
                                        sizes={mediaDetails.sizes} 
                                        srcSet={featuredImage.srcSet}
                                        isPoster={true} 
                                        sourceUrl={featuredImage.sourceUrl}
                                        sourceHeight={mediaDetails.height}
                                        sourceWidth={mediaDetails.width}
                                        altText={featuredImage.altText}
                                        addClasses={`${posterImg}`}
                                        /> </div></div>: ""
      }
      
      <div className={topInfo}>
        <h1 className={`${articleHeading}`}>{currentProject.title}</h1>
        <h2 className={`${tagLine} ${projectTag}`}>{HtmlStrip(currentProject.excerpt)}</h2>
        {(currentProject.toplinks)? <TopLinks links={currentProject.toplinks} />: ""}
      </div>
      <ReadingSection> 
        <CopyArea copy={currentProject.content} />
        <EndBullet />
        {
        (!currentProject.whatilearned)? "": <div className={`${whatILearned} ${fontSans}`}>
        <h3 className={typeSmaller}>What I Learned</h3>
        <ul className={typeSmaller}>
        {
          arraySplit(currentProject.whatilearned).map((e,i) => <li key={i}>{e}</li>)
        }
        </ul>
      </div>
      }
       <TagList items={currentProject.tags.nodes} />
      </ReadingSection>
      
      
      
      
  </Layout>
  
  )
}
export const query = graphql`
  query($slug: String!, $otherPosts: [String!] ) {
    currentProject: wpProject(slug: {eq: $slug}) {
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
    otherPosts: allWpProject(sort: {fields: date, order: DESC}
      filter: {slug: {in: $otherPosts}}) {
      edges {
        node {
          title
          slug
        }
      }
    }
  } 
`

