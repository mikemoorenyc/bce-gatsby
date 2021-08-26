// Step 2: Define your component
import * as React from 'react'
import Layout from '../../components/Layout'
import { graphql } from "gatsby"
import LandingHeader from '../../components/LandingHeader'
import CopyArea from '../../components/CopyArea'
import {
  contentCenterer,
  bottomMargin
} from "../../global-styles/utilities.module.scss"


const ContactPage = ({data}) => {
    const {title,content} = data.wpPage

    return (
      <Layout activeMenu={"Contact"} pageTitle={title}>
        <LandingHeader pageTitle={title} />
        <div className={contentCenterer}>
        
        <CopyArea copy={content} />
        </div>
        
      </Layout>
 
    )
  }
  // Step 3: Export your component
  export default ContactPage


  export const query = graphql`query difQuery {
    wpPage(slug: {eq: "contact-me"}) {
      content
      title
    }
    wp {
      generalSettings {
        portraitSvg
      }
    }
  }
  `