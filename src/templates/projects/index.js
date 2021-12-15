// Step 2: Define your component

import * as React from 'react'


import LandingHeader from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import BigCardList from '../../components/BigCardList'


import { graphql } from "gatsby"
import { HtmlStrip } from '../../utilities'



const Svg = React.lazy(()=>import("../../components/SVG"))
const ProjectsPage= ({data}) => {
  
    const {wpPage} = data,
        {nodes} = data.allWpProject;

        
    return (
      <Layout activeMenu={"Projects"} 
      pageTitle={wpPage.title} 
      headerLink={wpPage.link}
      headerDescription={HtmlStrip(wpPage.content)}
      >
          <LandingHeader pageTitle={wpPage.title} copy={wpPage.content} />
          <BigCardList posts={nodes.map(e => {
            e.ctaText = "View project"
            return e; 
          } )} />
        
      </Layout>
 
    )
  }
  // Step 3: Export your component
  export default ProjectsPage


  export const query = graphql`query projectsQuery($skip: Int!, $limit: Int!) {
    wpPage(slug: {eq: "projects"}) {
        content
        title
        link
      }
      allWpProject(sort: {fields: menuOrder, order: ASC},limit: $limit, skip: $skip) {
        nodes {
          excerpt
          slug,
          title,
          link
          ...featuredImageProject
        }
      }
  }
  `

 