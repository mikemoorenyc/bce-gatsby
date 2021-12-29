import React, { useRef, useState,useLayoutEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { domToReact } from "html-react-parser";
import { camelCaseAttributes } from "../../utilities"
import blankSVG from "../../assets/img-bg.svg";
import {
    thinBox
} from "../../global-styles/utilities.module.scss";
import FigCaption from "../CopyArea/FigCaption";
import {
    stdImg
} from "../CopyArea/imageStyles.module.scss";

const Video = ({node}) => {
    const data = useStaticQuery(
        graphql`
          query {
            allImgs : allWpMediaItem {
                nodes {
                    localFile {
                        publicURL
                        url
                    }
                    mediaDetails {
                        height
                        width
                    }
                    mediaType
                    mimeType
                    
                    
                }
              }
          }
        `
    )
    const videoContainer = useRef(null);
    const [inView, updateView] = useState(false);
    useLayoutEffect(()=>{
        let vidDom = videoContainer.current;
        console.log(vidDom);
        const observer = new IntersectionObserver((changes)=> {
            changes.forEach(change => {
                if(change.isIntersecting) {
                    updateView(true);
                    observer.unobserve(vidDom)
                    observer.disconnect(); 
                }
            })
        });
        observer.observe(vidDom);
        return () => {  
            observer.unobserve(vidDom);
            observer.disconnect(); 
        }
    },[])
    let video  = node.children.filter(c => c.name === "video") ;
    if(!video.length) {
        return false; 
    }
    video = video[0];

    let caption = node.children.filter(c => c.name === "figcaption")[0] || null;
    
    let localVideo = data.allImgs.nodes.filter(v => v.localFile.url === video.attribs.src);
    if(!localVideo.length) {
        return false; 
    }
  
    const {publicURL} = localVideo[0].localFile
    const {width,height} = localVideo[0].mediaDetails; 
    let videoValues = Object.entries(video.attribs);
 
    let videoProps = {};
    videoValues.forEach(e => {
        let attr = e[0]
        if(attr === "src") {
            return ;
        }
        attr = camelCaseAttributes[attr]; 
        videoProps[attr] = true;
        
    });
    const TheVideo = () => <video style={{width: "100%",maxWidth:width}} {...videoProps} ><source src={publicURL} type={localVideo[0].mimeType} /></video>

    
    return <figure className={stdImg} ref={videoContainer}>
        <div className={`${thinBox} ${(!inView)?"lazy-gradient" :""}`} style={{maxWidth:width,position:"relative"}}>
          { (!inView) ? <img src={blankSVG} style={{width: "100%", height: 0, paddingTop: ((height/width) * 100)+"%"}} /> : <TheVideo /> }
        </div>
        {(caption)? <FigCaption>{domToReact(caption.children)}</FigCaption>: ""}
    </figure>
}

export default Video ; 