import React from "react";
import { graphql } from "gatsby";

export default function TaggedPage({data,pageContext}) {
  const allPosts = data.posts.edges.concat(data.projects.edges).sort(function(a,b){
      return new Date(b.node.dateGmt) - new Date(a.node.dateGmt)
  })
  const {currentPage, tagNum} = pageContext;
  const prevNumber = (currentPage > 2) ? currentPage - 1 : ""
 
  return <div>
    {
      allPosts.map((e,i)=><div key={i}>{e.node.title} - {e.node.date} <br/></div>)
    }
    {
      (currentPage > 1) ? <a href={`/tagged/${pageContext.slug}/${prevNumber}`}>Previous</a> : ""
    }
    <br/>
    {
      (currentPage < tagNum) ? <a href={`/tagged/${pageContext.slug}/${currentPage+1}`}>Next</a> : ""
    }
  </div>


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
          date(formatString: "ddd MMM Do, YYYY HH:mm")
        }
      }
    }
    projects:allWpProject(filter: {slug: {in: $projects}}) {
      totalCount
      edges {
        node {
          title
          dateGmt
          date(formatString: "ddd MMM Do, YYYY HH:mm")
        }
      }
    }
    
  } 
`   