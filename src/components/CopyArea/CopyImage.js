
import React from "react"
import {domToReact} from "html-react-parser"
import LazyImg from "../LazyImg";
import { graphql, useStaticQuery } from "gatsby";



import {
    figcaption,
    stdImg
} from "./imageStyles.module.scss";

import {
    boxShadow,
    fontSans
} from "../../global-styles/utilities.module.scss"

export default function CopyImage({node}) {
    
    const data = useStaticQuery(
        graphql`
          query {
            allImgs : allWpMediaItem {
                nodes {
                  id
                  guid
                  localFile {
                    childImageSharp {
                      fixed {
                        height
                        width
                        src
                      }
                      fluid {
                        srcSet
                      }
                    }
                  }
                  databaseId
                  link
                  sourceUrl
                }
              }
          }
        `
    )
    
    function getdbId(classList) {
        let cArray = classList.split(" ");
        let imgClass = cArray.filter(e => e.includes("wp-image"));
        if (imgClass.length < 1) {
            return ;
        }
        let dbnumb = imgClass[0].split("-");
        return parseInt(dbnumb[dbnumb.length - 1])
        
    }
    const classes = node.attribs.class || "";
    let caption = node.children.filter(c => c.name === "figcaption")[0] || null;
    let img = node.children.filter(c => c.name === "img")[0] || null;
    if (!img) {
        return null; 
    }
    const theImg = data.allImgs.nodes.filter(e => e.databaseId == getdbId(img.attribs.class))
    if(theImg.length < 1) {
        return null; 
    }
    const {childImageSharp} = theImg[0].localFile;
    const {
        
        alt
    } = img.attribs;  
   const {
        width,
        height,
        src
    } = childImageSharp.fixed
    const {srcSet} = childImageSharp.fluid


    return <figure className={`${classes}`}>
        <div className={`${stdImg} ${boxShadow}`}><LazyImg sourceUrl={src} alt={alt} sourceHeight={height} sourceWidth={width} srcSet={srcSet} /></div>
        {(caption)? <figcaption className={`${figcaption} ${fontSans}`}>{domToReact(caption.children)}</figcaption>: ""}
    </figure>
} 