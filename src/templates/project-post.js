import React from "react"
import { getSrc } from "gatsby-plugin-image";
import CopyArea from "../components/CopyArea";
import EndBullet from "../components/EndBullet";
import { Fragment, useState, useEffect } from "react";
import PwForm from "../components/PwForm";
import Layout from "../components/Layout"
import LazyImg from "../components/LazyImg";
import MorePosts from "../components/MorePosts";
import ReadingSection from "../components/ReadingSection";
import SmallHeader from "../components/SmallHeader";
import TagList from "../components/TagList";
import { HtmlStrip, pwCheck } from "../utilities";
import parse from "html-react-parser"
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
  

    const {currentProject,otherPosts,parentPage,contactPage} = data

    const featuredImage =(currentProject.featuredImage)? currentProject.featuredImage.node : null

   
    const pwProtected = currentProject.categories.nodes.map(e=>e.name).includes("Password Protected");
    const [passwordState, updatePasswordState] = useState(pwProtected? "unverified": "verified");
    
    
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
                  <a rel="noreferrer noopener" target="_blank" href={l[1]}>{parse(l[0])}</a>
                </Fragment>
              )
            })
          }
        </div>
      )
    
    }   
  const pwSuccess = () => {
    updatePasswordState("verified");
  }
  useEffect(()=> {
    if(!pwProtected || !sessionStorage.getItem("savedPassword")) {
      return ; 
    }
    pwCheck(sessionStorage.getItem("savedPassword"),()=> {
      updatePasswordState("verified");
    }, () => {
      updatePasswordState("errored");
    })

  },[])
  const GatedContent = () =>   <ReadingSection> 
      
  <CopyArea copy={currentProject.content} />
  <EndBullet />
  
  {
  (!currentProject.whatilearned)? "": <div className={`${whatILearned} ${fontSans}`}>
  <SmallHeader size={3} copy={"What I learned"} />
  <ul className={typeSmaller}>
  {
    arraySplit(currentProject.whatilearned).map((e,i) => <li key={i}>{parse(e)}</li>)
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


  return (
    
  <Layout 
    
    pageTitle={currentProject.title} activeMenu={parentPage.menuslug}
    headerDescription={HtmlStrip(currentProject.excerpt)}
    headerImg={(featuredImage)? getSrc(featuredImage.localFile) : null }
    headerLink={currentProject.link}
  >
    <div className={topSection}>
      {
        (currentProject.featuredImage) ?<div className={`${topHero} ${posterContainer}`}> <LazyImg 
                                        
                                        isPoster={true} 
                                        databaseId={featuredImage.databaseId}
                                 
                                        addClasses={`${posterImg}`}
                                        />  </div>: ""
      }
        <div className={topInfoContainer}>
        <div className={topInfo}>
          <h1 className={`${articleHeading}`}>{currentProject.title}</h1>
          <h2 className={`${tagLine} ${projectTag}`}>{parse(HtmlStrip(currentProject.excerpt))}</h2>
          
        </div>
        </div>
      </div>
      
      {(!pwProtected || passwordState === "verified" )? <GatedContent /> :""}
      
      {(pwProtected && (!sessionStorage.getItem('savedPassword') || passwordState === "errored"))? <PwForm successCallback={pwSuccess} contactPageUrl={contactPage.link} />: ""}
      
      
      
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
      categories {
        nodes {
          name
        }
      }
      tags {
        nodes {
          slug
          name
        }
      }
      excerpt
      ...featuredImageProject
    }
    parentPage: wpPage(slug: {eq: "projects"}) {
      menuslug
    }
    contactPage: wpPage(slug: {eq: "contact-me"}) {
      link
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

