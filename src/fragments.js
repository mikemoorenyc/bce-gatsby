import { graphql } from "gatsby"



const postData = graphql`
fragment postData on WpPost {
    content
    title
    link
}

`


const ftest = graphql`
fragment featuredImagePost on WpPost {
    featuredImage{
      node {
        databaseId
      }
    }
  }
`
const featuredImageProject = graphql`
fragment featuredImageProject on WpProject {
    featuredImage{
      node {
        databaseId
      }
    }
  }
`



export {featuredImageProject,postData,ftest}