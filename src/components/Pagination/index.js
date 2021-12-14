import React from "react";
import { Link } from "gatsby";
import Svg from "../SVG"
import {
    paginationContainer,
    prevButton,
    paginationButton,
    singleBtn
} from "./styles.module.scss";

import {
    buttonStyling,
    fontSans,
    noUnderline
} from "../../global-styles/utilities.module.scss"



const Pagination = ({prevLink, nextLink}) => {
    if (!prevLink && !nextLink) {
        return null; 
    }

    const Btn = ({text,link,btnClass}) => {
        return <Link className={`${paginationButton} ${(!prevLink || !nextLink) ? singleBtn : ""} ${btnClass} ${fontSans} ${buttonStyling} ${noUnderline}`} to={link}>
                <span>{text}</span>
                <span><Svg icon={"arrow"} /></span>
                </Link>
    }

    return( 
    <div className={`${paginationContainer} `}>
        {(prevLink)? 
        <Btn text={"Previous"} link={prevLink} btnClass={`${prevButton} `}/>
        : null}
        {(nextLink)? 
        <Btn text={"Next"} link={nextLink} btnClass={""}/>
        : null}
    </div>  
    )}

export default Pagination;