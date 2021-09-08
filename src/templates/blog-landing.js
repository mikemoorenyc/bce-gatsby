import React from "react";
import { graphql, Link } from "gatsby";


export default function BlogLanding({data,pageContext}) {
    console.log(pageContext);
    const {numPages, currentPage} = pageContext;
    const posts = data.allWpPost.edges
    const prevPage = (currentPage <= 2) ? "" : (currentPage - 1).toString(); 
     
    return <div>
        {posts.map(( {node} ) => {
          return <div key={node.slug}>{node.title}</div>
        })}
        {
            (currentPage !== 1) ? <Link to={`/blog/${prevPage}`} >Previous</Link> : ""
        }
        <br/>
        {
            (currentPage !== numPages) ?<Link to={`/blog/${(currentPage + 1).toString()}`}>Next</Link> : ""
        }
    </div>
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allWpPost(sort: {fields: date, order: DESC}, limit: $limit, skip: $skip) {
        totalCount
        edges {
          node {
            title
            slug
          }
        }
      }
    
  } 
`