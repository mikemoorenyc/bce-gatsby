import React, {useContext} from "react";
import {Helmet} from "react-helmet";
import favIconDefault from "../../assets/favicon.ico"
import DarkModeContext from "../../context/DarkModeContext"
export interface HeadProps {
    siteIcon?: string,
    pageImage?: string,
    siteDescription?:any,
    pageDescription?:string,
    siteTitle: string,
    pageTitle?:string,
    siteLink: string,
    pageLink?: string,
    
}
const Head = ({siteIcon,pageImage,siteLink,siteTitle,siteDescription,pageDescription,pageLink,pageTitle}:HeadProps) =>  {

    

    const {color}= useContext(DarkModeContext);

  const headTitle = [pageTitle,siteTitle,siteDescription].filter( (e:string|undefined) => typeof e !== "undefined").join(" | "),
        headDesc = pageDescription || siteDescription,
        headLink = siteLink + (pageLink||""),
        headImg = siteLink +  (pageImage || siteIcon);

    return <Helmet htmlAttributes={{ lang: 'en' }}>
    <title>{headTitle}</title>
    <link rel="icon" href={favIconDefault} sizes="any" />
    <link rel="icon" href={`data:image/svg+xml;utf8,%3Csvg id='FavLogo' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cstyle%3E%23FavLogo %7Bfill: none;stroke:${color};%7D%3C/style%3E%3Ccircle cx='16' cy='16' r='15.5'/%3E%3Ccircle cx='16' cy='16' r='10.5' stroke-dasharray='3.5,2.5'/%3E%3C/svg%3E`} />

    <meta name="description" content={headDesc} />
    <meta property="og:url" content={headLink} />
    <meta  property="og:type" content="article" />
    <meta  property="og:title" content={pageTitle}/>
    <meta  property="og:image" content={headImg} />
    <meta  property="og:image:alt" content={headDesc}/>
    <meta property="og:description" content={headDesc} />
    <meta  property="twitter:url" content={headLink} />
    <meta  property="twitter:title" content={pageTitle} />
    <meta  property="twitter:description" content={headDesc} />
    <meta  property="twitter:image" content={headImg} />
    <meta property="twitter:image:alt" content={headDesc} />
    <meta  property="twitter:card" content={(headImg) ? "summary_large_image" : "summary"} /> 
    <link  rel="canonical" href={headLink} />

    <style type="text/css">{`
    .lazy-gradient {
        background-image: linear-gradient(45deg, var(--the-color) 5.56%, transparent 5.56%, transparent 50%, var(--the-color) 50%, var(--the-color) 55.56%, transparent 55.56%, transparent 100%);
background-size: 12.73px 12.73px;

    }
    body {
            //color: ${(!color) ? "var(--dark-base)" : color} }
    :root {
        --the-color : ${(!color) ? "rgba(0,0,0,0)" : color}
    }
`}</style>
<noscript>{`
    <style>:root{--the-color: #000; }body{color:#000 !important;}</style>
`}</noscript>



<script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GATSBY_GA_TAG}`}></script>
<script>
  {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.GATSBY_GA_TAG}');`}
</script>

<body className={(color === "white") ? "dark-mode" : ""} />
    
</Helmet>
}

export default Head;