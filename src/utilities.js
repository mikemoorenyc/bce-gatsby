import CopyImage from "./components/CopyArea/CopyImage";
import InternaLink from "./components/InternalLink";
import React from "react";
import TwitterBlock from "./components/CopyArea/TwitterBlock";
import parse from "html-react-parser"
import DownloadBlock from "./components/CopyArea/DownloadBlock"
import Video from "./components/Video"
import ButtonBlocks from "./components/CopyArea/ButtonBlocks"
import PullQuote from "./components/CopyArea/PullQuote";
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
            if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-video") > -1) {
                return <Video node={domNode} />
            }
            if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-buttons") > -1) {
                return <ButtonBlocks node={domNode} />
            }
            if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-file") > -1) {
                return <DownloadBlock node={domNode} />
            }
            if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-embed-twitter") > -1) {
                return <TwitterBlock node={domNode} />
            } 
            if(domNode.attribs && domNode.attribs.class && domNode.attribs["class"].indexOf("wp-block-pullquote") > -1) {
                return <PullQuote node={domNode} />
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
const timeConvert = (hour,min) => {
    let hr = (hour>12) ? hour-12 : ((hour === 0) ? 12 : hour ),
        ampm = (hour > 11) ? "PM" : "AM",
        minutes = ((min < 10) ? "0":"")+min
    return `${hr}:${minutes} ${ampm}`
}
const monthConvert = (num) => {
 
          return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][num]

}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const attrs = `accept acceptCharset accessKey action allowFullScreen alt async autoComplete
autoFocus autoPlay capture cellPadding cellSpacing challenge charSet checked
cite classID className colSpan cols content contentEditable contextMenu controls
controlsList coords crossOrigin data dateTime default defer dir disabled
download draggable encType form formAction formEncType formMethod formNoValidate
formTarget frameBorder headers height hidden high href hrefLang htmlFor
httpEquiv icon id inputMode integrity is keyParams keyType kind label lang list
loop low manifest marginHeight marginWidth max maxLength media mediaGroup method
min minLength multiple muted name noValidate nonce open optimum pattern
placeholder poster preload profile radioGroup readOnly rel required reversed
role rowSpan rows sandbox scope scoped scrolling seamless selected shape size
sizes span spellCheck src srcDoc srcLang srcSet start step style summary
tabIndex target title type useMap value width wmode wrap playsInline`.replace(/(\r\n|\n|\r)/gm, " ").split(" ").map(e=>e.trim());
const camelCaseAttributes = {};
attrs.forEach(e => {
    camelCaseAttributes[e.toLowerCase()] = e;
})

const pwCheck = (pw,successCallback,errorCallback) => {
    fetch(process.env.GATSBY_PW_CHECK_URL, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pw:pw}),
      })
      .then(response => response.json())
      .then(data => {
          successCallback(data);
          //updateSubmitting(false);
        sessionStorage.setItem("savedPassword",data.pw);
        //successCallback(true);
      })
      .catch((error) => {
          //updateSubmitting(false)
        //updatedErrorState(true)
        errorCallback(error);
      });
}

export {numberWithCommas,monthConvert, timeConvert, truncateString, copyParse, arraySplit, HtmlStrip,camelCaseAttributes, pwCheck}
