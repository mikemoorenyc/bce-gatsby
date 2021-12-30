// Step 1: Import React

import * as React from 'react'

import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import LazyImg from '../components/LazyImg'
import {BlogItem} from "../components/BlogItem"
import Svg from '../components/SVG'
import { copyParse,HtmlStrip,truncateString } from '../utilities'
import parse from "html-react-parser"
import {
  header,
  homeSection,
  sectionHeading,
  projectThumb,
  projectItem,
  projectCopy,
  homeTag,
  projectBtn,
  seeAllContainer,
} from "./home.module.scss";
import {
  contentCenterer,
  posterContainer,
  tagLine,
  noUnderline,
  fontSans,
  buttonStyling,
  gridLayout
} from "../global-styles/utilities.module.scss"

const SeeAllBtn = ({url,title}) => <div className={`${seeAllContainer}  ${contentCenterer}`}><Link className={`${fontSans}`} to={url}>See all {title.toLowerCase()}</Link></div>
// Step 2: Define your component
const IndexPage = ({data}) => {
  const {
    hpProjects,
    hpBlogs,
    projectPage,
    blogPage
  } = data; 

  return (
    <Layout activeMenu={"Home"}>
      <div className={`${header} ${contentCenterer} ${gridLayout}`}><div>{copyParse(data.wpPage.content)}</div></div>
     
      {(hpProjects.nodes.length)? <div className={` ${homeSection}`}>
        <h2 className={sectionHeading}><span className={`${contentCenterer}`}>{projectPage.title}</span></h2>
        <div className={` ${contentCenterer}`}>
          
               {
                hpProjects.nodes.map((n,i)=> {
              
                  return <article key={n.databaseId} className={projectItem}>
                    <Link to={n.link} className={`${projectThumb} ${posterContainer} normal-hover`} style={{paddingTop: "56.625%"}}>
                      {(n.featuredImage)? <LazyImg isPoster={true} databaseId={n.featuredImage.node.databaseId}/> : "" }
                    </Link>
                    <div className={projectCopy}>
                      <h3><Link to={n.link}>{n.title}</Link></h3>
                      {(n.excerpt) ? <div className={`${homeTag} ${tagLine}`}>{parse(truncateString(HtmlStrip(n.excerpt),75))}</div> : null}
                      <Link className={`${projectBtn} ${buttonStyling} ${fontSans} ${noUnderline} `} to={n.link}><span>View case study</span><span><Svg icon={"arrow"}/></span></Link>
                    </div>
                    
                  </article>
                })
              }
          
        </div>
        <SeeAllBtn url={"/projects/"} title={projectPage.title} />
        
      </div>:null}

      {(hpBlogs.nodes.length)? <div className={` ${homeSection} `}>
      <h2 className={sectionHeading}><span className={`${contentCenterer}`}>{blogPage.title}</span></h2>
      <div className={`${contentCenterer}`}>
      {
              hpBlogs.nodes.map((n,i) => {
                return <BlogItem 
                  key={n.databaseId}
                  {...n}
                
                />
              })
            }
            </div>
          <SeeAllBtn title={blogPage.title} url={"/blog/"} />
      </div> : null}
    
     
     
   
    </Layout>
    
  )
}
export const query = graphql`query MyQuery {
  hpProjects : allWpProject(filter: {categories: {nodes: {elemMatch: {slug: {eq: "home-page"}}}}},sort: {fields: menuOrder, order: ASC}) {
    nodes {
      dateGmt
      excerpt
      featuredImage {
        node {
          databaseId
          mediaDetails {
            sizes {
              sourceUrl
              name
            }
          }
          localFile {
            childImageSharp {
              fluid {
                srcSet
                src
              }
            }
          }
        }
      }
      content
      title
      slug
      link
      databaseId
    }
  }
  hpBlogs : allWpPost(filter: {categories: {nodes: {elemMatch: {slug: {eq: "home-page"}}}}},sort: {fields: date, order: DESC}) {
    nodes {
      title
      slug
      link
      databaseId
      excerpt
    }
  }
  wpPage(slug: {eq: "home"}) {
    content
    title
  }
  projectPage : wpPage(slug: {eq: "projects"}) {
    title
  }
  blogPage : wpPage(slug: {eq: "blog"}) {
    title
  }
}
`
// Step 3: Export your component
export default IndexPage

/*<article className={blogItem} key={n.databaseId}>
<h3><Link to={n.link} className={noUnderline}>{n.title}</Link></h3>
<div className={blogMeta}> {(n.excerpt) ? <div className={` ${tagLine}`}>{truncateString(HtmlStrip(n.excerpt),75)}</div> : null} <Link className={`${blogReadMore} ${fontSans}`} to={n.link}>Read More</Link></div>
</article> */