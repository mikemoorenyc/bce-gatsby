import React from "react"
import { getSrc } from "gatsby-plugin-image";
import AutoCheckLoader from "../components/AutoCheckLoader";
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
import { copyParse } from "../utilities";
import {
  projectTag,
  topHero,
  topInfo,
  topLinksClass,
  whatILearned,
  topSection,
  topInfoContainer
} from "./styles/project.module.scss";
import * as copyStyles from "../components/CopyArea/styles.module.scss";
import {
  articleHeading,
  fontSans,
  posterContainer,
  posterImg,
  tagLine,
  typeSmaller,
  bottomReadingSection
} from "../global-styles/utilities.module.scss"



import { arraySplit } from "../utilities";
import { graphql } from "gatsby"


export default function ProjectPost({ data,pageContext }) {
  

    const {currentProject,otherPosts,parentPage,contactPage} = data

    const featuredImage =(currentProject.featuredImage)? currentProject.featuredImage.node : null


    const pwProtected = currentProject.categories.nodes.map(e=>e.name).includes("Password Protected");
    const [passwordState, updatePasswordState] = useState(pwProtected? "unverified": "verified");
    const [postContent,updatePostContent] = useState(currentProject.content) 
    
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

  const pwSubmit = (pw) => {
    pwCheck(pw, (data) => {
      //console.log("done");
      sessionStorage.setItem("project-"+currentProject.databaseId, currentProject.content)
      updatePasswordState("verified");
    }, () => {
      updatePasswordState("errored");
    })
  }
  useEffect(()=> {
    let savedPassword = localStorage.getItem("savedPassword")
    let savedContent = sessionStorage.getItem("project-"+currentProject.databaseId);
      if(!savedPassword) {
        updatePasswordState("empty");
      }
      if(!pwProtected || !savedPassword) {
        return ; 
      }
      if(savedContent) {
        updatePostContent(savedContent);
        updatePasswordState("verified");
        return ; 
      }
      updatePasswordState("autochecking");
      
      pwSubmit(savedPassword);
  },[])
  /*const GatedContent = () =>   <ReadingSection> 
      
  <CopyArea copy={currentProject.content} isReadingSection={true}/>
  <EndBullet />
  <div className={bottomReadingSection}>
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

  </div>
  
  
</ReadingSection>*/
const FullText = () => {
  
  return copyParse(postContent); 
}
const contentPush = () => {
  if(!pwProtected || passwordState === "verified" ) {
   return  <FullText />
    
  }
  if(passwordState === "autochecking") {
    return <AutoCheckLoader />
  }

  if(pwProtected && (passwordState === "empty" || passwordState === "errored")) {
    return <PwForm submitFunction={pwSubmit} isErrored={passwordState === "errored" } allowInput={ passwordState === "empty" || passwordState === "errored" } contactPageUrl={contactPage.link} />
  }
  
}


  return (
    
  <Layout 
    
    pageTitle={currentProject.title} activeMenu={parentPage.menuslug}
    headerDescription={HtmlStrip(currentProject.excerpt)}
    headerImg={(featuredImage.sourceUrl)? getSrc(featuredImage.localFile) : null }
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
      <ReadingSection>
        <div className={`${copyStyles.copyArea} ${copyStyles.readingSection}`}>
          {contentPush()}
        </div>
      </ReadingSection>
      <EndBullet />
      <div className={bottomReadingSection}>
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

    </div>
      
      
      
      
      
  </Layout>
  
  )
}
/*
{(!pwProtected || passwordState === "verified" )? <GatedContent /> :""}
      
      {(pwProtected && (passwordState === "empty" || passwordState === "errored"))? <PwForm successCallback={pwSuccess} contactPageUrl={contactPage.link} />: ""}*/
export const query = graphql`
query($slug: String!, $otherPosts: [String!] ) {
    currentProject: wpProject(slug: {eq: $slug}) {
      content
      title
      whatilearned
      toplinks
      link
      databaseId
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

