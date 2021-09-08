import { domToReact } from "html-react-parser";
import React, {  Fragment, useEffect, useState , Suspense} from "react";

import {
    twitterEmbed,
    twitterIcon,
    profile,
    profileInfo,
    profileIcon,
    screenName,
    userName,
    timestamp,
    likes,
    tweet
} from "./twitterStyles.module.scss";
import {
    boxShadow,
    noUnderline,
    fontSans
} from "../../global-styles/utilities.module.scss"
const Svg = React.lazy(()=>import("../SVG"));


export default function TwitterBlock({node}) {
    let path = new URL(node.attribs["data-tweet-id"]).pathname.split("/"),
        id  = path[path.length -1];

    const [tweetJSON, getTweetJSON] = useState(false);
    useEffect(()=>{
        fetch(`https://www.becreativeeveryday.com/get-tweet/?id=${id}&key=${process.env.GATSBY_TWITTER_KEY}`, {
            method: 'GET', // or 'PUT'
        })
.then(function(response){
    return response.json()
})
.then(data => {

  getTweetJSON(data);
})
.catch((error) => {
  console.error('Error:', error);
});
    },[id])
    
    let purl = (tweetJSON)? "https://twitter.com/"+tweetJSON.user.screen_name : `dddd`;
    
    return <Fragment>
        {(!tweetJSON)?<blockquote>
            {domToReact(node.children[node.children.length - 1].children)}
        </blockquote> : 
            <div className={`${twitterEmbed} ${boxShadow}`}>
                <div className={twitterIcon} ><Suspense fallback={<div />}><Svg icon={"twitter"} /></Suspense></div>
                <div className={profile}>
                    <a href={purl} className={profileIcon}>
                        <img alt={tweetJSON.user.name} src={tweetJSON.user.profile_image_url} />
                    </a>
                    <div className={profileInfo}>
                        <h3 className={`${screenName}`}><a className={noUnderline} href={purl}>{tweetJSON.user.name}</a></h3>
                        <a className={`${userName} ${noUnderline} ${fontSans}`} href={purl}>@{tweetJSON.user.screen_name}</a>
                    </div>
                </div>
                <div className={tweet}>{tweetJSON.text}</div>
                <a  href={`https://twitter.com/${tweetJSON.user.screen_name}/status/${tweetJSON.id_str}`} className={`${timestamp} ${fontSans} ${noUnderline}`}>
                {tweetJSON.created_at}
                </a>
                <hr />
                <div className={likes}>
                    
                <Suspense fallback={<div />}> <Svg icon={"heart"} /> <span className={fontSans}>{tweetJSON.favorite_count}</span></Suspense>
                    
                </div>
            </div>
            
        }
    </Fragment>
}