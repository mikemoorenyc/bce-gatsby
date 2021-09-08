// Step 2: Define your component
import * as React from 'react'
import { Suspense } from 'react'
import Layout from '../../components/Layout'
import { graphql } from "gatsby"
import LandingHeader from '../../components/LandingHeader'
import CopyArea from '../../components/CopyArea'
import {
  contentCenterer,
  gridLayout,
  fontSans,
  noUnderline
} from "../../global-styles/utilities.module.scss"
import {
  copyLayout,
  socialLinks
} from "./styles.module.scss";
import { arraySplit } from '../../utilities'
const Svg = React.lazy(()=>import("../../components/SVG"))
const ContactPage = ({data}) => {
    const {title,content,socialmedialink} = data.wpPage

    const social = arraySplit(socialmedialink).map((e,i)=> {
      let item = arraySplit(e,",");
      return <li key={i}>
        <a className={`${fontSans} ${noUnderline}`}href={item[1]}>
        <Suspense key={i} fallback={<div/>}><Svg icon={item[0].toLowerCase().trim()}/></Suspense>
        {item[2]}
        </a>
      </li>   
      
     })
 
    return (
      <Layout activeMenu={"Contact"} pageTitle={title}>
        <LandingHeader pageTitle={title} />
        <div className={`${contentCenterer} ${gridLayout}`}>
        <div className={copyLayout}>
        <CopyArea copy={content} />
         {(social) ?  <ul className={socialLinks}>{social}</ul> :""}
        </div>
          
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
      socialmedialink
    }
    wp {
      generalSettings {
        portraitSvg
      }
    }
  }
  `