// Step 2: Define your component

import * as React from 'react'



import CopyArea from '../../components/CopyArea'
import LandingHeader from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import { arraySplit } from '../../utilities'
import { graphql } from "gatsby"


import {
  aboutLayout,
  copyBlock,
  likeBlock,
  likeSection,
  picture
} from "./styles.module.scss";
import {
  bottomMargin,
  contentCenterer,
  fontSans,
  gridLayout
} from "../../global-styles/utilities.module.scss"

const LikeBlock = ({list, title}) => {
  return (
    <div className={`${likeBlock} ${fontSans}`}>
      <h2>{title}</h2>
      <ul >
        {
          arraySplit(list, /\r?\n/).map((l,i) => (
            <li key={i}>{l}</li>
          ))
        }
      </ul>
    </div>
  )
}

const AboutPage = ({data}) => {
 
    const {title,content,thingsilike,thingsidontlike} = data.wpPage

    return (
      <Layout activeMenu={"About Me"} pageTitle={title}>
        <LandingHeader pageTitle={title} />
        <div className={` ${aboutLayout} ${contentCenterer} ${gridLayout}`}>
          <div className={`${picture} ${bottomMargin}`} dangerouslySetInnerHTML={{__html: data.wp.generalSettings.portraitSvg}} />
          <CopyArea copy={content} extraClasses={copyBlock}/>
          <div className={likeSection}>
            <LikeBlock list={thingsilike} title={"Things I Like"} />
            <LikeBlock list={thingsidontlike} title={"Things I Don't Like"} />
          </div>
        </div>
        
      </Layout>
 
    )
  }
  // Step 3: Export your component
  export default AboutPage


  export const query = graphql`query aboutQuery {
    wpPage(slug: {eq: "about-me"}) {
      content
      title
      thingsilike
      thingsidontlike
    }
    wp {
      generalSettings {
        portraitSvg
      }
    }
  }
  `