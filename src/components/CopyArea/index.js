import React, { Fragment } from "react";
import parse from "html-react-parser"
import CopyImage from "./CopyImage";
import TwitterBlock from "./TwitterBlock";
import {
    copyArea
} from "./styles.module.scss"

function Remove() {
    return null;
}

export default function CopyArea({copy}) {
    let prep = document.createElement("div");
    prep.innerHTML = copy;
    let tweets = prep.querySelectorAll(".wp-block-embed-twitter");
    
    tweets.forEach(function(e) {
       let href = (e.querySelector("a"))? e.querySelector("a").getAttribute("href") :null
       
       if(href) {
        e.setAttribute("data-tweet-id",href); 
       }
       let bq = e.querySelector("blockquote");
       let i = document.createElement("div")
       i.classList.add("content-holder");
       i.innerHTML = bq.innerHTML
       if(bq) {
           e.appendChild(i);
       }
       
    });
 
    const checkClass = function(classList) {
        if(!classList) {
            return false; 
        }
        const removers =[
            
           
        ]
        let isInClass = classList.split(" ").filter(e=> {
            return removers.includes(e)
        });
        console.log(isInClass);
        return isInClass.length > 0;

    }
    return (

        <div className={copyArea}>
            {parse(prep.innerHTML, {
                replace: domNode => {
                    
                    if(domNode.name === "script") {
                   
                        return <Remove />;
                    }
                    if(domNode.attribs && checkClass(domNode.attribs.class)) {
                        return <Remove />;
                    }
                    if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-image") > -1) {
                        return <CopyImage node={domNode} />
                    }
                    if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("twitter-tweet") > -1) {
                        
                    }
                    if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-embed-twitter") > -1) {
                        return <TwitterBlock node={domNode} />
                    }
                }
            })}   
        </div>
    )
}