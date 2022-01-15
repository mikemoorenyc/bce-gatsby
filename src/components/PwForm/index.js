import React from "react";
import { Link } from "gatsby";
import { useState, useEffect } from "react";

import * as styles from "./styles.module.scss"
import {
    fontSans,
    beforeBlock
} from "../../global-styles/utilities.module.scss"
import Svg from "../SVG";

const PwForm = ({contactPageUrl, submitFunction, allowInput, isErrored}) => {

    const [passInput, updatePassInput] = useState("")
    //const [errored,updatedErrorState] = useState()
    const errored = isErrored;
    const [isSubmitting, updateSubmitting] = useState(!allowInput)
    const submitCheck = (e) => {
        e.preventDefault(); 
        updateSubmitting(true);
        submitFunction(passInput)
        /*
        updateSubmitting(true);
        updatedErrorState(false);
        e.preventDefault(); 
        
        pwCheck(passInput, ()=> {
            updateSubmitting(false);
            successCallback(true);
        }, () => {
            updateSubmitting(false)
            updatedErrorState(true)
          
        })
        */
    }
    useEffect(()=> {
        console.log(allowInput);
        updateSubmitting(!allowInput)
    },[allowInput,isErrored])
    return <form className={`${styles.form} ${fontSans} `} onSubmit={submitCheck}>
        <h1>Password Required</h1>
        <p className={`${styles.info} `}>You can request the password by contacting me. <Link to={contactPageUrl}>See contact options</Link>.</p>
        
        <div className={`${styles.input} ${beforeBlock} ${(passInput.length)?styles.containsText: ""} ${(errored)?styles.errored:""}`}>
            <label htmlFor="password"><span>Enter Password</span></label>
            <input id="password" disabled={isSubmitting}  onChange={(e)=>{updatePassInput(e.target.value)}} type="text" value={passInput} />  <div className={styles.errorIcon}><Svg icon={"error"} /></div></div>
        {(!errored)?<div className={styles.errorText}>&nbsp;</div>:<div className={styles.errorText}>You didn&rsquo;t enter the right password. Try again.</div>}
     
        <button className={`${styles.submitButton} ${beforeBlock} ${isSubmitting? "lazy-gradient":""}`} disabled={isSubmitting}>Submit</button>


        </form>
}

export default PwForm;