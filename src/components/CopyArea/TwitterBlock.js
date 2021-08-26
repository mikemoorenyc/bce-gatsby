import { domToReact } from "html-react-parser";
import React, { Fragment, useEffect, useState } from "react";
import Svg from "../SVG"
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

export default function TwitterBlock({node}) {
    let path = new URL(node.attribs["data-tweet-id"]).pathname.split("/"),
        id  = path[path.length -1];
    console.log(id)
    const [tweetJSON, getTweetJSON] = useState(false);
    useEffect(()=>{
        fetch(`https://www.becreativeeveryday.com/get-tweet/?id=${id}&key=${process.env.GATSBY_TWITTER_KEY}`, {
            method: 'GET', // or 'PUT'
        })
.then(function(response){
    return response.json()
})
.then(data => {
    console.log(data);
  getTweetJSON(data);
})
.catch((error) => {
  console.error('Error:', error);
});
    },[])
    
    let purl = (tweetJSON)? "https://twitter.com/"+tweetJSON.user.screen_name : `dddd`
    return <Fragment>
        {(!tweetJSON)?<blockquote>
            {domToReact(node.children[node.children.length - 1].children)}
        </blockquote> : 
            <div className={`${twitterEmbed} ${boxShadow}`}>
                <div className={twitterIcon} ><Svg icon={"twitter"} /></div>
                <div className={profile}>
                    <a href={purl} className={profileIcon}>
                        <img src={tweetJSON.user.profile_image_url} />
                    </a>
                    <div className={profileInfo}>
                        <h3 className={`${screenName}`}><a className={noUnderline} href={purl}>{tweetJSON.user.name}</a></h3>
                        <a className={`${userName} ${noUnderline} ${fontSans}`} href={purl}>@{tweetJSON.user.screen_name}</a>
                    </div>
                </div>
                <div className={tweet}>{tweetJSON.text}</div>
                <a target="_blank" href={`https://twitter.com/${tweetJSON.user.screen_name}/status/${tweetJSON.id_str}`} className={`${timestamp} ${fontSans} ${noUnderline}`}>
                {tweetJSON.created_at}
                </a>
                <hr />
                <div className={likes}>
                    
                       <Svg icon={"heart"} /> <span className={fontSans}>{tweetJSON.favorite_count}</span>
                    
                </div>
            </div>
            
        }
    </Fragment>
}