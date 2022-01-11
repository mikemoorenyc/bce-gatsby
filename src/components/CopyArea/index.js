import React from "react";


import { copyParse } from "../../utilities";

import {
    copyArea, readingSection
} from "./styles.module.scss"


export default function CopyArea({copy, extraClasses,isReadingSection}) {
    
    return (

        <div  className={`${copyArea} ${isReadingSection ? readingSection : ""} ${extraClasses || ""}`} >{copyParse(copy)}</div>

    )
}  


//   