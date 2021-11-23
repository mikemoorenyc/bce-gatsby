import React, { Fragment, useEffect, useRef, useState } from "react";
import {
    boxShadow,
    fontSans,
    noUnderline
} from "../../global-styles/utilities.module.scss"
import {
    likes,
    profile,
    profileIcon,
    profileInfo,
    screenName,
    timestamp,
    tweet,
    twitterEmbed,
    twitterIcon,
    userName
} from "./twitterStyles.module.scss";

import { domToReact } from "html-react-parser";

import Svg from "../../components/SVG";


export default function TwitterBlock({node}) {
    let domParse = useRef(null);
    const [tweetJSON, getTweetJSON] = useState(false);

    return <div ref={domParse}>{(!tweetJSON)?domToReact(node.children[node.children.length - 1].children): null}</div> 

}