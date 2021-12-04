import React, { Fragment, useLayoutEffect, useRef, useState } from "react";
import {
    boxShadow,
    fontSans,
    noUnderline,
    
} from "../../global-styles/utilities.module.scss"
import {
    tweetBlock,
    topContent,
    userInfo,
    profilePic,
    userName,
    screenName,
    twitterLogo,
    h2,
    tweet,
    dateStamp,
    meta,
    icon,
    number,
    interaction
} from "./twitterStyles.module.scss";

import { domToReact } from "html-react-parser";

import Svg from "../../components/SVG";

const Remove = () => null ; 
export default function TwitterBlock({node}) {
    let domParse = useRef(null);
    const [tweetJSON, getTweetJSON] = useState();
    
    const BasicHTML = () => {
        return <div>{domToReact(node.children[node.children.length - 1].children, {
            replace: domNode => {
                if(domNode.name === "script") {
                    return <Remove />;
                }
                
            }
        })}</div>
    }
    let tweetId = null;
    node.children[node.children.length - 1].children.forEach((e) => {
        if(e.name === "blockquote") {
            e.children.forEach((e) => {
                if(e.name === "a") {
                    if(!e.attribs.href) {
                        return false; 
                    }
                    let path = new URL(e.attribs.href).pathname.split("/");
                    tweetId = path[path.length - 1];
                    return false;
                }
            })
        }
        return false; 
    })
    const fetchTweet = () => {
        ///CREATE A STATIC JSON FILE ON MY SERVER FOR TESTING. SET THE URL AS AN .ENV VARIABLE
    }
    
    useLayoutEffect(()=> {
        const observer = new IntersectionObserver(onChange);
        function onChange(changes){
            changes.forEach(change => {
                if(change.isIntersecting) {
                    fetchTweet();
                    observer.disconnect(); 
                }
            })
        }
        observer.observe(domParse.current);
        return () => {  
            observer.disconnect(); 
        }
    },[])

    return <div ref={domParse}>{(!tweetJSON)?<BasicHTML />: (
        <div className={tweetBlock}>
            <div className={topContent}>
                <div className={userInfo}>
                    <a className={profilePic}><img src="https://pbs.twimg.com/profile_images/432081479/DOI_LOGO_bigger.jpg" /></a>
                    <div className={userName}>
                        <h2 className={h2}><a href="#">Name of user</a></h2>
                        <a href="" className={`${screenName} ${fontSans} ${noUnderline}`}>@username</a>
                    </div>
                </div>
                <a href="" className={twitterLogo}>
                    <Svg icon={"twitter"} />
                </a>
            </div>
            <div className={tweet}>dafdfasdfdfafd asdfiadj; ;aslkjdf;l adfoiherl as;dlfkha sdoihasdfads;lk aldfh a;sdlfkh</div>
            <a href="" className={`${dateStamp} ${noUnderline} ${fontSans}`}>6:00 PM : May 16 2014</a>
            <div className={`${meta} ${fontSans}`}>
                {[[55,"heart"],[45,"chat"]].map((n,i) => <div className={interaction}> <span className={icon}><Svg icon={n[1]} /></span><span className={number}>{n[0]}</span>   </div>)}
            </div>
        </div>
    )}</div> 

}