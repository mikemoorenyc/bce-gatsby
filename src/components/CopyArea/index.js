import React from "react";
import {
    copyArea
} from "./styles.module.scss"
import { copyParse } from "../../utilities";



export default function CopyArea({copy, extraClasses}) {
    
    return (

        <div className={`${copyArea} ${extraClasses || ""}`}>
            {copyParse(copy)}   
        </div>
    )
}