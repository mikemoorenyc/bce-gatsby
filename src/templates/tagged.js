import React from "react";
import { graphql } from "gatsby";

import LandingHeader from "../components/LandingHeader";
import Layout from "../components/Layout"

import BigCardList from "../components/BigCardList";


export default function TaggedPage({data,pageContext}) {
  const addType = (list,type) => {
    return (list).map((e) => {
      e.node.type = type;
      return e;
    })
  }  
  
  const allPosts = addType(data.posts.edges,"post").concat(addType(data.projects.edges,"project")).sort(function(a,b){
  
      return new Date(b.node.dateGmt) - new Date(a.node.dateGmt)
  }).map((e) => {
    let n = e.node;
    n.kicker = `A ${(n.type==="post")? "blog post" : "project"} from ${new Date(parseInt(n.date)).getFullYear()}`
    return n; 
  })
  
  const {currentPage, tagNum} = pageContext;
  const prevNumber = (currentPage > 2) ? currentPage - 1 : ""
  const tagTitle = `Content tagged to: "${data.wpTag.name}"`
 
  return <Layout pageTitle={tagTitle}> <div>
    <LandingHeader pageTitle={tagTitle}  />
    <BigCardList posts={allPosts} />
    
    {
      (currentPage > 1) ? <a href={`/tagged/${pageContext.slug}/${prevNumber}`}>Previous</a> : ""
    }
    <br/>
    {
      (currentPage < tagNum) ? <a href={`/tagged/${pageContext.slug}/${currentPage+1}`}>Next</a> : ""
    }
  </div>
  </Layout>

}
export const query = graphql`
  query($slug: String!, $posts: [String], $projects:[String]) {
    wpTag(slug: {eq: $slug}) {
        name
    }
    posts:allWpPost(filter: {slug: {in: $posts}}) {
      totalCount
      edges {
        node {
          title
          dateGmt
          link
          excerpt
          slug     
          date(formatString: "x")
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
    projects:allWpProject(filter: {slug: {in: $projects}}) {
      totalCount
      edges {
        node {
          title
          dateGmt
          link
          excerpt
          slug
          date(formatString: "x")
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

/*
{
      allPosts.map((e,i)=>{
      let n = e.node
      let img = (n.featuredImage)? n.featuredImage.node: {};
      return <Card key={n.slug}
        title={n.title}
        link={n.link}
        desc={n.excerpt}
        {...img}
        kicker= {`A ${(n.type==="post")? "blog post" : "project"} from ${new Date(parseInt(n.date)).getFullYear()}`}
      />})
    }
    */