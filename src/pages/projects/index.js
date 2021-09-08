// Step 2: Define your component
import * as React from 'react'
import { Suspense } from 'react'
import Layout from '../../components/Layout'
import { graphql } from "gatsby"
import LandingHeader from '../../components/LandingHeader'
import Card from "../../components/Card"
import {
  contentCenterer,
  gridLayout,
  fontSans,
  noUnderline
} from "../../global-styles/utilities.module.scss"
import {
  card,
  cardContainer
} from "./styles.module.scss";

const Svg = React.lazy(()=>import("../../components/SVG"))
const ProjectsPage= ({data}) => {
    const {wpPage} = data,
        {nodes} = data.allWpProject;

    
    return (
      <Layout activeMenu={"Projects"} pageTitle={wpPage.title}>
          <LandingHeader pageTitle={wpPage.title} copy={wpPage.content} />
        <div className={`${cardContainer} ${contentCenterer} ${gridLayout}`} >
            {
                nodes.map(e => {
                    let img = (e.featuredImage)? e.featuredImage.node: {};
               return  <Card key={e.slug} extraClasses={card} kicker={"fake kicker"} title={e.title} desc={e.excerpt} link={`/project/${e.slug}`} {...img}/>
                     })
            }
        </div>
      </Layout>
 
    )
  }
  // Step 3: Export your component
  export default ProjectsPage


  export const query = graphql`query projectsQuery {
    wpPage(slug: {eq: "projects"}) {
        content
        title
      }
      allWpProject(sort: {fields: menuOrder, order: ASC}) {
        nodes {
          excerpt
          slug,
          title,
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
  `