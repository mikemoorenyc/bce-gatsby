
import React from "react"
import {domToReact} from "html-react-parser"
import LazyImg from "../LazyImg";
import FigCaption from "./FigCaption";
import { graphql,useStaticQuery } from "gatsby";


import * as styles from "./imageStyles.module.scss";

import {
    thinBox,
    beforeBlock,
    afterBlock
} from "../../global-styles/utilities.module.scss"

const {
  
    stdImg,
    screenshotImg
} = styles
export default function CopyImage({node}) {
    const data = useStaticQuery(
        graphql`
          query {
            allImgs : allWpMediaItem {
                nodes {
                    databaseId
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
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
    let isScreenshot = classes.includes("screenshot");
    
    if (!img) {
        return null; 
    }
    const imgData = data.allImgs.nodes.filter(e=> e.databaseId ===getdbId(img.attribs.class) )[0];

    const {width} = imgData.localFile.childImageSharp.gatsbyImageData;
    return <figure className={`${stdImg}`}>
        <div className={`${classes.split(" ").map(e=>styles[e]).join(" ")} ${(isScreenshot) ? `${beforeBlock} ${afterBlock}` : ""}`}
        style={{maxWidth: (isScreenshot)?width:""}}
        >
            <LazyImg databaseId={getdbId(img.attribs.class)} addClasses={`${(!isScreenshot)?thinBox:screenshotImg} `} />
        </div>
        {(caption)? <FigCaption>{domToReact(caption.children)}</FigCaption>: ""}
    </figure>
} 