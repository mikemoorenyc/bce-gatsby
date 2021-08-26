// Step 1: Import React
import * as React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'

// Step 2: Define your component
const IndexPage = ({data}) => {
  return (
    <Layout activeMenu={"Home"}>
      <main>
     
     <h1>Welcome to my Gatsby site!</h1>
     <Link to="/about">About</Link>
     <p>I'm making this by following the Gatsby Tutorial.</p>
     <ul>
       {
         data.allWpProject.nodes.map((n,i)=> (
           <li key={i}><a href={`project/${n.slug}`}>{n.title}</a></li>
         ))
       }
     </ul>
   </main>
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
    }
  }
}
`
// Step 3: Export your component
export default IndexPage

