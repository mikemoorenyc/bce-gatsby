import React from "react"

import CopyArea from "../components/CopyArea";
import EndBullet from "../components/EndBullet";
import { Fragment } from "react";

import Layout from "../components/Layout"
import LazyImg from "../components/LazyImg";
import MorePosts from "../components/MorePosts";

import ReadingSection from "../components/ReadingSection";
import SmallHeader from "../components/SmallHeader";
import TagList from "../components/TagList";
import { HtmlStrip } from "../utilities";

import {
  projectTag,
  topHero,
  topInfo,
  topLinksClass,
  whatILearned
} from "./styles/project.module.scss";

import {
  articleHeading,
  fontSans,
  posterContainer,
  posterImg,
  tagLine,
  typeSmaller
} from "../global-styles/utilities.module.scss"



import { arraySplit } from "../utilities";
import { graphql } from "gatsby"

export default function ProjectPost({ data,pageContext }) {

    const {currentProject,otherPosts} = data

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
    const defaultImg = (currentProject.featuredImage) ? featuredImage.localFile.childImageSharp.fluid.src : null
  return (
    
  <Layout 
    
    pageTitle={currentProject.title} activeMenu={"Projects"}
    headerDescription={HtmlStrip(currentProject.excerpt)}
    headerImg={defaultImg}
    headerLink={currentProject.link}
  >
    
      {
        (currentProject.featuredImage) ?<div className={topHero}><div className={`${topHero} ${posterContainer}`}> <LazyImg 
                                        sizes={mediaDetails.sizes} 
                                        srcSet={featuredImage.localFile.childImageSharp.fluid.srcSet}
                                        isPoster={true} 
                                        sourceUrl={defaultImg}
                                        sourceHeight={featuredImage.localFile.childImageSharp.fixed.height}
                                        sourceWidth={featuredImage.localFile.childImageSharp.fixed.width}
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
        <SmallHeader size={3} copy={"What I learned"} />
        <ul className={typeSmaller}>
        {
          arraySplit(currentProject.whatilearned).map((e,i) => <li key={i}>{e}</li>)
        }
        </ul>
      </div>
      }
       <TagList items={currentProject.tags.nodes} />
      </ReadingSection>
      
      <MorePosts posts={otherPosts.edges.map(e => e.node)} title={"More Projects"} />
      
      
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
      link
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
    otherPosts: allWpProject(sort: {fields: date, order: DESC}
      filter: {slug: {in: $otherPosts}}) {
      edges {
        node {
          title
          slug
          link
          excerpt
          featuredImage {
            node {
              srcSet
              altText
              sourceUrl
            }
          }
        }
      }
    }
  } 
`

