import "../../global-styles/global-styles.scss";

import { Fragment, useEffect, useRef, useState } from "react";
import { Link, graphql, useStaticQuery } from "gatsby"
import { arraySplit } from "../../utilities";
import { Helmet } from "react-helmet";
import GridLines from "../GridLines";
import parse from "html-react-parser"

import React from "react"
import Svg from "../SVG"
import ColorModeToggle from "../ColorModeToggle";
import {
    active,
    contactFooter,
    footer,
    inner,
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
    socialFooter
} from "./styles.module.scss"
import {
    afterBlock,
    beforeBlock,
    contentCenterer,
    fontSans,
    middleCenter
} from "../../global-styles/utilities.module.scss"


export default function Layout({pageTitle, headerDescription,headerImg,headerLink, children, activeMenu}) {
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
   
    function hamburgerClick(e) {
    
        changeOpenState(!menuOpen);
        hamburgerDOM.current.blur();
    }
    const hamburgerDOM = useRef(null);
    const updateColorMode = (color) => {
        updateFaviconColor(color);
        localStorage.setItem("current_color", color);
        let dmSet = (color === "white") ? "yes" : "no" 
        localStorage.setItem("dark_mode", dmSet);
    }
    const [menuOpen, changeOpenState] = useState(false);
    const theTitle = data.wp.allSettings.generalSettingsTitle,
          desc = data.wp.allSettings.generalSettingsDescription

    const headerCheck = useRef(null);
    const [hideHeader, updateHeaderState] = useState(false);
    const [favIconColor, updateFaviconColor] = useState(null);
    const colors = ["DarkRed", "darkGreen", "darkslateblue", "purple","orangered","saddlebrown","black"]
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
            
            updateColorMode(colorPicker() )
        }
        colormodeInit();
        const observer = new IntersectionObserver(function(changes){
            if(changes[0].isIntersecting) {
                updateHeaderState(false)
             
              } else {
                updateHeaderState(true)
            }
        })
        observer.observe(headerCheck.current);
        return () => {
            observer.disconnect();
        }
    },[updateFaviconColor]);
    
    function Head() {

        let headImg = headerImg || ((data.siteIcon && data.siteIcon.featuredImage)? data.siteIcon.featuredImage.node.localFile.childImageSharp.fluid.src : null) ;
        let headDesc = headerDescription || desc;
        let headTitle = pageTitle || theTitle;
        let headLink = data.wp.allSettings.generalSettingsCanonUrl+(headerLink || "")
        return <Helmet>
        <title>{(!pageTitle)? theTitle : `${pageTitle} - ${theTitle}`}</title>
       
        <link rel="icon" href={`data:image/svg+xml;utf8,%3Csvg id='FavLogo' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cstyle%3E%23FavLogo %7Bfill: none;stroke:${favIconColor};%7D%3C/style%3E%3Ccircle cx='16' cy='16' r='15.5'/%3E%3Ccircle cx='16' cy='16' r='10.5' stroke-dasharray='3.5,2.5'/%3E%3C/svg%3E`} />

        <meta name="description" content={headDesc} />
        <meta property="og:url" content={headLink} />
        <meta  property="og:type" content="article" />
        <meta  property="og:title" content={headTitle}/>
        <meta  property="og:image" content={headImg} />
        <meta  property="og:image:alt" content={headDesc}/>
        <meta property="og:description" content={headDesc} />
        <meta  property="twitter:url" content={headLink} />
        <meta  property="twitter:title" content={headTitle} />
        <meta  property="twitter:description" content={headDesc} />
        <meta  property="twitter:image" content={headImg} />
        <meta property="twitter:image:alt" content={headDesc} />
        <meta  property="twitter:card" content={(headerImg) ? "summary_large_image" : "summary"} /> 
        <link  rel="canonical" href={headLink} />

        <style type="text/css">{`
        .lazy-gradient {
            background-image: linear-gradient(45deg, ${favIconColor} 5.56%, transparent 5.56%, transparent 50%, ${favIconColor} 50%, ${favIconColor} 55.56%, transparent 55.56%, transparent 100%);
background-size: 12.73px 12.73px;
    
        }
        body {
                color: ${(!favIconColor) ? "var(--dark-base)" : favIconColor}
    `}</style>

    <body className={(favIconColor === "white") ? "dark-mode" : ""} />
        
    </Helmet>
    }

    return (
        <Fragment>
            
        <Head />
        <div id="header-test"></div>
        <header id="top-header" role="presentation"  className={`${(menuOpen)?showMenu :""}`}>
            <div className={mainLogo}>
                <a  aria-label={theTitle} href="/" className={`${spinner} ${beforeBlock}`}><span style={{display:"none"}}>{theTitle}</span></a>
                <div className={logoText} style={{display: (hideHeader)? "none": "" }}>
                    <div className={topLogo}>
                    <a className={"no-underline"}  href="/"><span className={`${title} ${fontSans}`}>{theTitle}</span></a> 
                    </div>
                    <div className={`${topTagline} `}><a className={"no-underline"} href="/">{parse(desc)}</a></div>
                </div>
            </div>
            
            <div className={scrim}></div>
            <nav className={nav}>
                <div className={lockup}>
                    <div className={topLogo}>
                        <a href="/">
                            <span className={`${title} ${fontSans}`}>
                                {
                                    theTitle.split(" ").map((n,i) => (
                                        <span key={i}>{n}</span>
                                    ))
                                }

                            </span>
                         </a>
                    </div>
                    <div className={topTagline}><a href="/">{parse(desc)}</a></div>
                </div>
                <div className={navItems}>
                    {
                    data.wpMenu.menuItems.nodes.map(n => (
                        <div className={`${navItem} ${(n.label === activeMenu)?active : ""}`} key={n.id}>
                            <Link onClick={hamburgerClick} to={n.url}>{parse(n.label)}</Link></div>
                      ))
                    }
                    <ColorModeToggle colorPicker={colorPicker} currentColor={favIconColor} switchFunction={updateColorMode} />
                </div>
                

            </nav>
            <button ref={hamburgerDOM} onClick={(e)=>{e.preventDefault();hamburgerClick()}}  id="nav-opener" className={`${navOpener} ${beforeBlock} ${afterBlock}`}>
                <span className={middleCenter}><Svg icon={(menuOpen)? "x" : "menu"} /></span>     
            </button>
        </header>
        <div id="footer-grid-wrap">
            <main id="main-content-container" className={mainContentContainer}>
                <div ref={headerCheck} style={{width: "100%", height: "1px"}}/>
                    {children}
            </main>
            <footer className={`${footer} ${fontSans} lazy-gradient`}>
                <div className={`${inner} ${contentCenterer}`}>
                    <div><b>Menu</b>
                    <ul className={`${socialFooter} `}>
                        {
                            data.wpMenu.menuItems.nodes.map(n => (
                                <li key={n.id}><Link to={n.url}>{parse(n.label)}</Link></li>
                             ))
                         }
                    </ul>
                    </div>
                    {
                        (data.socialLinks && data.socialLinks.socialmedialink) ?<div>
                           <div> <b>Email &amp; Social</b>
                            <ul className={socialFooter}>
                                {
                                    arraySplit(data.socialLinks.socialmedialink).map((e,i)=> {
                                        let item = arraySplit(e,",");
                                        return <li key={i}>
                                            <a href={item[1]} target="_blank" rel="noreferrer noopener">{item[0]}</a> 
                                        </li>
                                    })
                                }
                            </ul>
                        </div></div> : null
                    }
                    
                
                </div>
            </footer>
        </div>

        {
           (process.env.GATSBY_IS_DEV === "yes") ? <GridLines /> : ""
        }
        
        </Fragment>
    )
}

//<body style={(!favIconColor) ? "color: var(--dark-base)" : `color: ${favIconColor}`} className={(favIconColor === "white") ? "dark-mode" : ""} />