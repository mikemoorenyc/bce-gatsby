import React from "react";
import parse from "html-react-parser"
import {
    copyArea
} from "./styles.module.scss"


export default function CopyArea({copy}) {
    return (

        <div className={copyArea}>
            {parse(copy, {
                replace: domNode => {

                }
            })}   
        </div>
    )
}