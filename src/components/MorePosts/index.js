import {
    mpContainer,
    slimCard
} from "./styles.module.scss";

import Card from "../Card";
import React from "react";
import SmallHeader from "../SmallHeader";
import {
    contentCenterer
} from "../../global-styles/utilities.module.scss";

export default function MorePosts({posts,title}) {
    

    return <div className={` ${mpContainer} ${contentCenterer}`}>
        <SmallHeader copy={title || "More posts"} />
        {posts.map(e=> {
            e.desc = e.excerpt
            let img = (e.featuredImage)? e.featuredImage.node: {};
        return <Card key={e.slug} {...e} {...img} extraClasses={slimCard} styleMod={"slim"}/>})}

    </div>
}  