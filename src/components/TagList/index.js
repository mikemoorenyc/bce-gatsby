import React from "react"


export default function TagList({items}) {
    if(!items.length || typeof items !== "object") {
        return "";
    }


    return <div>
        <h2>This article was tagged to the following terms</h2>
        <ul>
            {
                items.map((e,i)=> <li key={e.slug}><a href={`/tagged/${e.slug}`}>{e.name}</a></li>)
            }
        </ul>
    </div>
}