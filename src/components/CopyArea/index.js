import React from "react";


import { copyParse } from "../../utilities";

import {
    copyArea
} from "./styles.module.scss"


export default function CopyArea({copy, extraClasses}) {
    
    return (

        <div  className={`${copyArea} ${extraClasses || ""}`} >{copyParse(copy)}</div>

    )
}  


//   