import "../../global-styles/global-styles.scss";
import PropTypes from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby"

import Head from "./Head"
import GridLines from "../GridLines";
import parse from "html-react-parser"
import Header from "../Header"
import FoldCheck from "../Header/FoldCheck"
import SkipContent from "../Header/SkipContent"
import React from "react"
import Svg from "../SVG"
import ColorModeToggle from "../ColorModeToggle";
import Footer from "../Footer"
import {
    active,
    lockup,
    logoText,
    mainContentContainer,
    mainLogo,
    nav,
    navItem,
    navItems,
    navOpener,
    scrim,
    showMenu,
    spinner,
    title,
    topLogo,
    topTagline,
    contentSkip
} from "./styles.module.scss"
import {
    afterBlock,
    beforeBlock,
    fontSans,
    middleCenter,
    noUnderline,
    fwNormal
} from "../../global-styles/utilities.module.scss"



const Layout = ({pageTitle, headerDescription,headerImg,headerLink, children, activeMenu}) => {
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
    function hamburgerClick(e) {
    
        changeOpenState(!menuOpen);
        hamburgerDOM.current.blur();
    }
    const hamburgerDOM = useRef(null);
    const updateColorMode = (color) => {
        updateFaviconColor(color);
        sessionStorage.setItem("current_color", color);
        let dmSet = (color === "white") ? "yes" : "no" 
        localStorage.setItem("dark_mode", dmSet);
    }
    const [menuOpen, changeOpenState] = useState(false);
    

    const headerCheck = useRef(null);
    const [hideHeader, updateHeaderState] = useState(false);
    const [favIconColor, updateFaviconColor] = useState(null);
    const colors = (data.wp.allSettings.generalSettingsColorOptions || "darkRed black").split(" ");
    const colorPicker = () => colors[Math.floor(Math.random() * colors.length)]
    useEffect(()=>{
        //Is dark mode currently set? 
        let dm = localStorage.getItem("dark_mode");
        let colormodeInit = () => {
            //DarkMode currently set to yes or user defaults to dark mode
            if(dm === "yes" || (!dm && (window.matchMedia && 
                window.matchMedia('(prefers-color-scheme: dark)').matches)) ) {
                updateColorMode("white");
                return; 
            }
            //Switch to color mode
            updateColorMode(colorPicker())
           // updateColorMode(sessionStorage.getItem("current_color") || colorPicker() )
        }
        colormodeInit();
        const queries = new URLSearchParams(window.location.search);
        if(!localStorage.getItem("savedPassword")) {
            if(queries.get('pw')) {
                localStorage.setItem("savedPassword", queries.get('pw'));
            }  
        }
        
       /* const observer = new IntersectionObserver(function(changes){
            if(changes[0].isIntersecting) {
                updateHeaderState(false)
             
              } else {
                updateHeaderState(true)
            }
        })
        observer.observe(headerCheck.current);
        return () => {
            observer.disconnect();
        }*/
    },[updateFaviconColor]);
    
    

    return (
        <Fragment>
            
        <Head {...headData} favIconColor={favIconColor} />
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

//<body style={(!favIconColor) ? "color: var(--dark-base)" : `color: ${favIconColor}`} className={(favIconColor === "white") ? "dark-mode" : ""} />
