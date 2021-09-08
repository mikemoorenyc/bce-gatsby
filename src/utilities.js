import parse from "html-react-parser"
import CopyImage from "./components/CopyArea/CopyImage";
import TwitterBlock from "./components/CopyArea/TwitterBlock";
import React from "react";
import InternaLink from "./components/InternalLink";
const HtmlStrip = function(htmlString) {
    let d = document.createElement("div");
    d.innerHTML = htmlString;
    return d.innerText;
}
const arraySplit = function(string, splitValue = /\r?\n/) {
    return string.split(splitValue);
}

const copyParse = function(copy) {
    function Remove() {
        return null;
    }
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
     
        return isInClass.length > 0;

    }
    return parse(prep.innerHTML, {
        replace: domNode => {
            if(domNode.name === "a" && domNode.attribs["data-type"] == "page") {
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

export {copyParse, HtmlStrip,arraySplit}