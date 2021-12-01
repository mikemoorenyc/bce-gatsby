import CopyImage from "./components/CopyArea/CopyImage";
import InternaLink from "./components/InternalLink";
import React from "react";
import TwitterBlock from "./components/CopyArea/TwitterBlock";
import parse from "html-react-parser"

const HtmlStrip = function(string) {
    if(!string) {
        return "";
    }

    return string.replace(/(<([^>]+)>)/gi, "")
    
}


const arraySplit = function(string, splitValue = /\r?\n/) {
    return string.split(splitValue);
}

const copyParse = function(copy) {
    function Remove() {
        return null;
    }
    /*let prep = document.createElement("div");
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
        
    });*/
    const checkClass = function(classList) {
        if(!classList) {
            return false; 
        }
        const removers =[
            
           
        ]
        let isInClass = classList.split(" ").filter(e=> {
            return removers.includes(e)
        });
     
        return isInClass.length > 0;

    }
    return parse(copy, {
        replace: domNode => {
            if(domNode.name === "a" && domNode.attribs["data-type"] === "page") {
                return <InternaLink node={domNode} />
            }
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
    })
}
const truncateString = function(str, num) {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
}

export {truncateString, copyParse, arraySplit, HtmlStrip}