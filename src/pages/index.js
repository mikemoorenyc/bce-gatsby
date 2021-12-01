// Step 1: Import React

import * as React from 'react'

import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import LazyImg from '../components/LazyImg'
import BlogItem from "../components/BlogItem"
import Svg from '../components/SVG'
import { copyParse,HtmlStrip,truncateString } from '../utilities'
import {
  header,
  homeSection,
  sectionHeading,
  projectThumb,
  projectItem,
  homeTag,
  projectBtn,
  seeAllContainer,
  blogItem,
  blogMeta,
  blogReadMore
} from "./home.module.scss";
import {
  contentCenterer,
  posterContainer,
  tagLine,
  noUnderline,
  fontSans,
  buttonStyling
} from "../global-styles/utilities.module.scss"


// Step 2: Define your component
const IndexPage = ({data}) => {
  const {
    hpProjects,
    hpBlogs
  } = data; 

  return (
    <Layout activeMenu={"Home"}>
      <div className={`${header} ${contentCenterer}`}>{copyParse(data.wpPage.content)}</div>
     
      {(hpProjects.nodes)? <div className={` ${homeSection} ${contentCenterer}`}>
        <h2 className={sectionHeading}><span>Projects</span></h2>
        <div>
          
               {
                hpProjects.nodes.map((n,i)=> {
                  let thumb = (n.featuredImage) ? n.featuredImage.node.localFile.childImageSharp.fluid : null; 
                  
                  return <article key={n.databaseId} className={projectItem}>
                    <Link to={n.link} className={`${projectThumb} ${posterContainer}`} style={{paddingTop: "56.625%"}}>
                      {(thumb)? <LazyImg isPoster={true} sourceUrl={thumb.src} srcSet={thumb.srcSet}/> : "" }
                    </Link>
                    <h3><Link to={n.link}>{n.title}</Link></h3>
                    {(n.excerpt) ? <div className={`${homeTag} ${tagLine}`}>{truncateString(HtmlStrip(n.excerpt),75)}</div> : null}
                    <Link className={`${projectBtn} ${buttonStyling} ${fontSans} ${noUnderline}`} to={n.link}><span>View Project</span><span><Svg icon={"arrow"}/></span></Link>
                  </article>
                })
              }
          
        </div>
        <div className={`${seeAllContainer}`}><Link className={`${fontSans}`} to={"/projects"}>See all projects</Link></div>
        
      </div>:null}

      {(hpBlogs)? <div className={` ${homeSection} ${contentCenterer}`}>
      <h2 className={sectionHeading}><span>Writing</span></h2>
      <div>
      {
              hpBlogs.nodes.map((n,i) => {
                return <BlogItem 
                  key={n.databaseId}
                  {...n}
                
                />
              })
            }
            </div>
          <div className={`${seeAllContainer}`}><Link className={`${fontSans}`} to={"/blog"}>See all writing</Link></div>
      </div> : null}
    
     
     
   
    </Layout>
    
  )
}
export const query = graphql`query MyQuery {
  hpProjects : allWpProject(sort: {fields: menuOrder, order: ASC}, limit: 3) {
    nodes {
      dateGmt
      excerpt
      featuredImage {
        node {
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
  hpBlogs : allWpPost(sort: {fields: date, order: DESC}, limit: 2) {
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
}
`
// Step 3: Export your component
export default IndexPage

/*<article className={blogItem} key={n.databaseId}>
<h3><Link to={n.link} className={noUnderline}>{n.title}</Link></h3>
<div className={blogMeta}> {(n.excerpt) ? <div className={` ${tagLine}`}>{truncateString(HtmlStrip(n.excerpt),75)}</div> : null} <Link className={`${blogReadMore} ${fontSans}`} to={n.link}>Read More</Link></div>
</article> */