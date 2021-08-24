// Step 1: Import React
import * as React from 'react'
import { graphql, Link } from 'gatsby'
import "../global-styles.scss"
import Layout from '../components/Layout'

// Step 2: Define your component
const IndexPage = ({data}) => {
  return (
    <Layout>
      <main>
     
     <h1>Welcome to my Gatsby site!</h1>
     <Link to="/about">About</Link>
     <p>I'm making this by following the Gatsby Tutorial.</p>
     <ul>
       {
         data.allWpProject.nodes.map(n => (
           <li><Link to={`project/${n.slug}`}>{n.title}</Link></li>
         ))
       }
     </ul>
   </main>
    </Layout>
    
  )
}
export const query = graphql`query MyQuery {
  allWpProject(limit: 4) {
    nodes {
      title
      slug
    }
  }
}
`
// Step 3: Export your component
export default IndexPage

