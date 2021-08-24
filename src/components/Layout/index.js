import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { Helmet } from "react-helmet"


export default ({pageTitle, headerMeta, children}) => {
    const data = useStaticQuery(
        graphql`
          query {
            site {
                siteMetadata {
                  description
                  title
                }
              }
              wpMenu(name: {eq: "Main Menu"}) {
                menuItems {
                  nodes {
                    url
                    label
                  }
                }
              }
          }
        `
    )
    const theTitle = data.site.siteMetadata.title;
    return (
        <div>
            <Helmet>
                <title>{(!pageTitle)? theTitle : `${pageTitle} - ${theTitle}`}</title>
                <meta name="description" content={data.site.description} />
            </Helmet>
            <ul>
                {
                    data.wpMenu.menuItems.nodes.map(n => (
                        <li><Link to={n.url}>{n.label}</Link></li>
                      ))
                }
            </ul>
            {children}
        </div>
    )
}