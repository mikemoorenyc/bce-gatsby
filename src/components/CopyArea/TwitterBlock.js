import React, {  useLayoutEffect, useRef, useState } from "react";
import {
    
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

    interaction
} from "./twitterStyles.module.scss";

import { domToReact } from "html-react-parser";

import Svg from "../../components/SVG";
import { monthConvert,timeConvert,numberWithCommas } from "../../utilities";

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
    const TweetBlock = ({data}) => {
        const {user} = data; 
        const profileURL = `http://twitter.com/${user.screen_name}`; 
        const tweetURL = `http://twitter.com/${user.screen_name}/status/${data.id_str}`
        const date = new Date(data.created_at);
        
        return (
            <div className={tweetBlock}>
                <div className={topContent}>
                    <div className={userInfo}>
                        <a href={profileURL} rel="noreferrer noopener"  target={"_blank"} className={profilePic}><img src={user.profile_image_url} alt={user.name} /></a>
                        <div className={userName}>
                            <h2 className={h2}><a rel="noreferrer noopener"  href={profileURL} target={"_blank"}>{user.name}</a></h2>
                            <a rel="noreferrer noopener"  href={profileURL} target={"_blank"} className={`${screenName} ${fontSans} ${noUnderline}`}>@{user.screen_name}</a>
                        </div>
                    </div>
                    <a href={tweetURL} target="_blank" rel="noreferrer noopener"  className={twitterLogo}>
                        <Svg icon={"twitter"} />
                    </a>
                </div>
                <div className={tweet}>{data.text}</div>
                <a href={tweetURL}  rel="noreferrer noopener" target="_blank" className={`${dateStamp} ${noUnderline} ${fontSans}`}>{timeConvert(date.getHours(),date.getMinutes())} : {monthConvert(date.getMonth())} {date.getDate()} {date.getFullYear()}</a>
                <div className={`${meta} ${fontSans}`}>
                    {[[numberWithCommas(data.favorite_count),"heart"],[numberWithCommas(data.retweet_count),"retweet"]].map((n,i) => <div key={i} className={interaction}> <span className={icon}><Svg icon={n[1]} /></span><span >{n[0]}</span>   </div>)}
                </div>
            </div>
        )
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
    
    
    useLayoutEffect(()=> {
        const observer = new IntersectionObserver(onChange);
        const blockObverserver = domParse.current
        function onChange(changes){
            changes.forEach(change => {
                if(change.isIntersecting) {
                    observer.unobserve(blockObverserver);
                    observer.disconnect(); 
                    fetch(`${process.env.GATSBY_TWEET_URL}?id=${tweetId}`, {
                        method: 'GET', // or 'PUT'
                    })
                    .then(function(response){
                        return response.json()
                    })
                    .then(data => {
                  
                        getTweetJSON(data)
                    })
                    
                }
            })
        }
        observer.observe(blockObverserver);
        return () => {  
            observer.unobserve(blockObverserver);
            observer.disconnect(); 
        }
    },[tweetId])

    return <div ref={domParse}>{(!tweetJSON)?<BasicHTML />: <TweetBlock data={tweetJSON} />}</div> 

}