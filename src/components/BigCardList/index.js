import React from "react"
import Card from "../Card"

import {
    card,
    cardContainer
} from "./styles.module.scss";

import {
    contentCenterer,

    gridLayout,

  } from "../../global-styles/utilities.module.scss"

export default function BigCardList({posts}) {
    
    return <div className={`${cardContainer} ${contentCenterer} ${gridLayout}`}>
        {
                posts.map(e => {
              
               return  <Card key={e.slug} ctaText={e.ctaText || "View post"} featuredImage={e.featuredImage} extraClasses={card} kicker={e.kicker} title={e.title} desc={e.excerpt} link={e.link} />
                     })
            }
    </div>
}