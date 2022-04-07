import { graphql, useStaticQuery } from "gatsby";

import { Link } from "gatsby";
import React from "react"

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
type NodeProps = {
  node: {
    attribs: {
      href:string,
      "data-type": string,
      "data-id":string
    }
    children: {data:string}[]
  }
}
export default function InternaLink({node}:NodeProps) {

  
    let url = node.attribs.href;
    const {attribs} = node 
  
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
  let postData = data[`allWp${capitalizeFirstLetter(attribs['data-type'])}`].nodes.find( (e: {databaseId:number}) => e.databaseId === parseInt(attribs["data-id"]));
  
  
  
    
    url = (postData) ? postData.link : url; 

    return <Link to={url}>{node.children[0].data}</Link>
}


