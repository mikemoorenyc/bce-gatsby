import CopyImage from "./components/CopyArea/CopyImage";
import InternaLink from "./components/InternalLink";
import React from "react";
import TwitterBlock from "./components/CopyArea/TwitterBlock";
import parse from "html-react-parser"
import DownloadBlock from "./components/CopyArea/DownloadBlock"
import Video from "./components/Video"
import ButtonBlocks from "./components/CopyArea/ButtonBlocks"
import PullQuote from "./components/CopyArea/PullQuote";
import VisionBoard from "./components/CopyArea/VisionBoard"

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
    
    const reactReplace = (domNode) =>{
        const reactOptions = [
            ["wp-block-image", CopyImage],
            ["wp-block-embed-twitter", TwitterBlock],
            ["wp-block-video",Video],
            ["wp-block-buttons", ButtonBlocks],
            ["wp-block-file",DownloadBlock],
            ["wp-block-pullquote",PullQuote],
            ['wp-vision-board-container',VisionBoard]
        ]
        if(!domNode.attribs || !domNode.attribs.class) {
            return false; 
        }
        const newReact = reactOptions.filter(e=> domNode.attribs.class.includes(e[0]))
        if(!newReact.length) {
            return false; 
        }
        //return newReact[0][1];

        return React.createElement(newReact[0][1], {
            node: domNode
          });
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
            if(reactReplace(domNode)) {
                return reactReplace(domNode);
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

const pwCheck = (pw,successCallback,errorCallback,databaseId,postType) => {

    fetch("/api/pwCheck", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({pw:pw,databaseId:databaseId,postType:postType}),
      })
      .then(response => {
        console.log(response);
        if (response.ok) {
            return response.json(); 
        }
        throw new Error('Something went wrong');
      })
      .then(data => {
          successCallback(data);
          //updateSubmitting(false);
          console.log('checked pw')
        localStorage.setItem("savedPassword",data.pw);
        //successCallback(true);
      })
      .catch((error) => {
        console.log("ddd")
          //updateSubmitting(false)
        //updatedErrorState(true)
        console.log(error);
        errorCallback(error);
      });
}

export {numberWithCommas,monthConvert, timeConvert, truncateString, copyParse, arraySplit, HtmlStrip,camelCaseAttributes, pwCheck}
