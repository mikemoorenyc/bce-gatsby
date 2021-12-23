import React from "react"

import CopyArea from "../components/CopyArea";
import EndBullet from "../components/EndBullet";
import { Fragment } from "react";

import Layout from "../components/Layout"
import LazyImg from "../components/LazyImg";
import MorePosts from "../components/MorePosts";
import getImgSrc from "../getImgSrc";
import ReadingSection from "../components/ReadingSection";
import SmallHeader from "../components/SmallHeader";
import TagList from "../components/TagList";
import { HtmlStrip } from "../utilities";

import {
  projectTag,
  topHero,
  topInfo,
  topLinksClass,
  whatILearned,
  topSection,
  topInfoContainer
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

    const featuredImage =(currentProject.featuredImage)? currentProject.featuredImage.node : null

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
    
  <Layout 
    
    pageTitle={currentProject.title} activeMenu={"Projects"}
    headerDescription={HtmlStrip(currentProject.excerpt)}
    headerImg={(featuredImage)? getImgSrc(featuredImage.databaseId) : null }
    headerLink={currentProject.link}
  >
    <div className={topSection}>
      {
        (currentProject.featuredImage) ?<div className={`${topHero} ${posterContainer}`}> <LazyImg 
                                        
                                        isPoster={true} 
                                        databaseId={featuredImage.databaseId}
                                 
                                        addClasses={`${posterImg}`}
                                        /> </div>: ""
      }
        <div className={topInfoContainer}>
        <div className={topInfo}>
          <h1 className={`${articleHeading}`}>{currentProject.title}</h1>
          <h2 className={`${tagLine} ${projectTag}`}>{HtmlStrip(currentProject.excerpt)}</h2>
          
        </div>
        </div>
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
      {(currentProject.toplinks)? <TopLinks links={currentProject.toplinks} />: ""}
       <TagList items={currentProject.tags.nodes} />
       <MorePosts posts={otherPosts.edges.map(e => {
         let post = e.node;
         post.ctaText = "View project"
         return post;
       })} title={"More Projects"} />
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
      link
      tags {
        nodes {
          slug
          name
        }
      }
      excerpt
      ...featuredImageProject
    }
    otherPosts: allWpProject(sort: {fields: date, order: DESC}
      filter: {slug: {in: $otherPosts}}) {
      edges {
        node {
          title
          slug
          link
          excerpt
          ...featuredImageProject
        }
      }
    }
  } 
`

