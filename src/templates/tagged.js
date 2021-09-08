import React from "react";
import { graphql } from "gatsby";

export default function TaggedPage({data}) {
    const {wpTag,allWpProject,allWpPost} = data;
    
    const posts = allWpPost.nodes.concat(allWpProject.nodes)
    return <div>{wpTag.name}
        {
            posts.map((e,i) => <div key={i}>{e.title}</div>)
        }
    </div>

}
export const query = graphql`
  query($slug: String!) {
    wpTag(slug: {eq: $slug}) {
        name
    }
    allWpProject(filter: {tags: {nodes: {elemMatch: {slug: {eq: $slug}}}}}) {
        nodes {
          title
        }
    }
    allWpPost(filter: {tags: {nodes: {elemMatch: {slug: {eq: $slug}}}}}) {
        nodes {
          title
        }
    }
    
  } 
`