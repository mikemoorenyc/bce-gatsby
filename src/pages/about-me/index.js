// Step 2: Define your component
import * as React from 'react'
import Layout from '../../components/Layout'
import { graphql } from "gatsby"
import LandingHeader from '../../components/LandingHeader'
import CopyArea from '../../components/CopyArea'
import {
  contentCenterer,
  bottomMargin,
  fontSans
} from "../../global-styles/utilities.module.scss"
import {
  picture, 
  likeBlock,
  list
} from "./styles.module.scss";

const LikeBlock = ({list, title}) => {
  return (
    <div className={`${likeBlock} ${fontSans}`}>
      <h2>{title}</h2>
      <ul >
        {
          list.split(/\r?\n/).map(l => (
            <li>{l}</li>
          ))
        }
      </ul>
    </div>
  )
}

const AboutPage = ({data}) => {
    console.log(data);
    const {title,content,thingsilike,thingsidontlike} = data.wpPage

    return (
      <Layout activeMenu={"About"} pageTitle={title}>
        <LandingHeader pageTitle={title} />
        <div className={contentCenterer}>
        <div className={`${picture} ${bottomMargin}`} dangerouslySetInnerHTML={{__html: data.wp.generalSettings.portraitSvg}} />
        <CopyArea copy={content} />
        <div>
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