import "../../global-styles/global-styles.scss";
import PropTypes from "prop-types";
import { Fragment, FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import { graphql, useStaticQuery } from "gatsby"
import DarkModeContext from "../../context/DarkModeContext";
import Head from "./Head"
import GridLines from "../GridLines";
import parse from "html-react-parser"
import Header from "../Header"
import FoldCheck from "../Header/FoldCheck"
import SkipContent from "../Header/SkipContent"
import React from "react"
import { HeadProps } from "./Head";
import Footer from "../Footer"
import {

    mainContentContainer,

} from "./styles.module.scss"


interface LayoutProps extends HeadProps {
  headerDescription? : string,
  headerImg? : string, 
  activeMenu?:string
  headerLink?:string,
  children: JSX.Element
}


const Layout :FunctionComponent<LayoutProps> = ({pageTitle, headerDescription,headerImg,headerLink, children, activeMenu}) => {
    const data = useStaticQuery(
        graphql`
          query {
            siteIcon: wpPage(isFrontPage: {eq: true}) {
                id
                featuredImage {
                  node {
                    localFile {
                      childImageSharp {
                        fluid {
                          src
                        }
                      }
                    }
                  }
                }
              }
            socialLinks: wpPage(slug: {eq: "contact-me"}) {
                content
                title
                socialmedialink
            }
            contactEmail: allWpUserRole {
                nodes {
                  name
                }
              }
            wp {
                allSettings {
                  generalSettingsDescription
                  generalSettingsTitle
                  generalSettingsCanonUrl
                  generalSettingsColorOptions
                }
              }
              wpMenu(name: {eq: "Main Menu"}) {
                menuItems {
                  nodes {
                    url
                    label
                    id
                  }
                }
              }
          }
        `
    )
    
    const siteTitle = data.wp.allSettings.generalSettingsTitle,
          siteDesc = parse(data.wp.allSettings.generalSettingsDescription)
    const headData ={
        siteTitle:siteTitle,
        siteDescription: siteDesc ,
        siteIcon: ((data.siteIcon && data.siteIcon.featuredImage)? data.siteIcon.featuredImage.node.localFile.childImageSharp.fluid.src : null) ,
        siteLink: data.wp.allSettings.generalSettingsCanonUrl,
        pageImage: headerImg,
        pageTitle: pageTitle,
        pageDescription: headerDescription,
        pageLink: headerLink
    }
   const menuItemsList = data.wpMenu.menuItems.nodes
   

    
    const darkModeSettings = useContext(DarkModeContext);

    useEffect(()=>{
      darkModeSettings.getColors(data.wp.allSettings.generalSettingsColorOptions);
   
        const queries = new URLSearchParams(window.location.search);
        if(!localStorage.getItem("savedPassword")) {
          const pw = queries.get('pw')
            if(pw!= null) {
                localStorage.setItem("savedPassword", pw );
            }  
        }
        
       
    },[]);
    
    

    return (
        <Fragment>
            
        <Head {...headData} favIconColor={darkModeSettings.color} />
        <SkipContent />
        <div id="header-test"></div>
        <Header current={activeMenu} siteTitle={headData.siteTitle} siteDesc={headData.siteDescription} menuItems={menuItemsList} />
        <div id="footer-grid-wrap">
            <main id="main-content-container" className={mainContentContainer}>
                    <FoldCheck />
                    {children}
            </main>


            <Footer menuItems={menuItemsList} socialMediaLinks={data.socialLinks.socialmedialink}/>
        </div>

        {
           (process.env.GATSBY_IS_DEV === "yes") ? <GridLines /> : ""
        }
        
        </Fragment>
    )
}

Layout.propTypes = {
    pageTitle : PropTypes.string, 
    headerDescription : PropTypes.string,
    headerImg : PropTypes.string,
    headerLink : PropTypes.string, 
    children : PropTypes.any.isRequired, 
    activeMenu : PropTypes.string
}

export default Layout; 

