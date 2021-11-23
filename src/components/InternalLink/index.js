import { graphql, useStaticQuery } from "gatsby";

import { Link } from "gatsby";
import React from "react"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function InternaLink({node}) {

  
    let url = node.attribs.href;
    const {attribs} = node 
    console.log()
    const data = useStaticQuery(
      graphql`
        query {
          allWpPost {
            nodes {
              databaseId
              link
              slug
            }
          }
          allWpPage {
            nodes {
              databaseId
              link
              slug
            }
          }
          allWpProject {
            nodes {
              databaseId
              link
              slug
            }
          }
        }
      `
  )
  let postData = data[`allWp${capitalizeFirstLetter(attribs['data-type'])}`].nodes.filter(e => e.databaseId === parseInt(attribs["data-id"]))[0];
  
  
  
    
    url = (postData) ? postData.link : url; 

    return <Link to={url}>{node.children[0].data}</Link>
}


