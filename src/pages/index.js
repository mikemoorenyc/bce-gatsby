// Step 1: Import React

import * as React from 'react'

import { Link, graphql } from 'gatsby'

import Card from '../components/Card'
import Layout from '../components/Layout'

import { copyParse } from '../utilities'
import {
  header
} from "./home.module.scss";
import {
  contentCenterer
} from "../global-styles/utilities.module.scss"


// Step 2: Define your component
const IndexPage = ({data}) => {
  
  return (
    <Layout activeMenu={"Home"}>
      <div className={`${header} ${contentCenterer}`}>{copyParse(data.wpPage.content)}</div>
     
      <div>
        <h2>Projects</h2>
        <div>
          
               {
                data.allWpProject.nodes.map((n,i)=> (
                  <Card {...n} key={i}  />
                ))
              }
          
        </div>
      </div>
    
     <div>
       <h2>From the Blog</h2>
        <div>
            {
              data.allWpPost.nodes.map((n,i) => (<div key={n.databaseId}>{n.title}<br/>{n.data}</div>))
            }
        </div>
     </div>
     
   
    </Layout>
    
  )
}
export const query = graphql`query MyQuery {
  allWpProject(sort: {fields: menuOrder, order: ASC}, limit: 3) {
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
        }
      }
      content
      title
      slug
      link
    }
  }
  allWpPost(sort: {fields: date, order: ASC}, limit: 2) {
    nodes {
      title
      slug
      link
      date
      databaseId
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

