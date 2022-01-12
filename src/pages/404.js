import * as React from "react"
import { Link , graphql,useStaticQuery} from "gatsby"

import Layout from "../components/Layout"
import {copyArea,readingSection} from "../components/CopyArea/styles.module.scss"
// markup
const NotFoundPage = () => {
  const data = useStaticQuery(
    graphql`
    query {
      mainMenu: wpMenu(name: {eq: "Main Menu"}) {
        menuItems {
          nodes {
            url
            label
            id
          }
        }
      }

    }

    `
  )
  const {nodes} = data.mainMenu.menuItems;
  console.log(nodes);
  return (
    
   <Layout pageTitle={"Page not found"}>
     
     <div className={`${copyArea} ${readingSection}`}>
       <h1>Page not found</h1>
       <div style={{marginBottom: "1em"}}>It seems like the page you wanted doesn't exist. Trying looking for something in one of the places below:</div>
      
        <ul>
          {
            nodes.map((e) => <li style={{marginBottom: ".5em"}}><Link to={e.url}>{e.label}</Link></li>)
          }
        </ul>
      
     </div>
     
   </Layout> 
  )
}

export default NotFoundPage
  