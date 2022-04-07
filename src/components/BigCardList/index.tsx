import React from "react"
import CardComponent from "../Card"
import  {card,cardContainer} from "./styles.module.scss";
import {
  contentCenterer,
  gridLayout
}from "../../global-styles/utilities.module.scss"
import {Card} from "../../typings/interfaces"

interface ListCard extends Card {
    slug: string, 
    excerpt?: string
  }

export default function BigCardList({posts}:{posts: ListCard[]}) {
    
    return <div className={`${cardContainer} ${contentCenterer} ${gridLayout}`}>
        {
                posts.map((e : ListCard) => {
              
               return  <CardComponent key={e.slug} ctaText={e.ctaText || "View post"} featuredImage={e.featuredImage} extraClasses={card} kicker={e.kicker} title={e.title} desc={e.excerpt} link={e.link} />
                     })
            }
    </div>
}