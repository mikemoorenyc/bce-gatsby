import {
    mpContainer,
    slimCard,
    postItemsContainer
} from "./styles.module.scss";

import Card from "../Card";
import React from "react";
import SmallHeader from "../SmallHeader";


export default function MorePosts({posts,title}) {
 
    if(!posts.length) {
        return null;
    }
    return <div className={` ${mpContainer} `}>
        <SmallHeader copy={title || "More posts"} />
        <div className={postItemsContainer}>
        {posts.map(e=> {
            e.desc = e.excerpt
           e.featuredImage = null;
        return <Card key={e.slug} {...e}  extraClasses={slimCard} styleMod={"slim"}/>})}
        </div>

    </div>
}  