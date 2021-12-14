import {
    mpContainer,
    slimCard,
    postItemsContainer
} from "./styles.module.scss";

import Card from "../Card";
import React from "react";
import SmallHeader from "../SmallHeader";


export default function MorePosts({posts,title}) {
    

    return <div className={` ${mpContainer} `}>
        <SmallHeader copy={title || "More posts"} />
        <div className={postItemsContainer}>
        {posts.map(e=> {
            e.desc = e.excerpt
            let img = (e.featuredImage)? e.featuredImage.node: {};
        return <Card key={e.slug} {...e} {...img} extraClasses={slimCard} styleMod={"slim"}/>})}
        </div>

    </div>
}  