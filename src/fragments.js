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
      mediaDetails {
        sizes {
          sourceUrl
          height
          width
          name
        }
        width
      height
      }
      sourceUrl
      srcSet
      altText
      localFile {
        childImageSharp {
          fixed {
            src
            width
            height
          }
          fluid {
            srcSet
            src
          }
        }
      }
    }
    }
  }
`
const featuredImageProject = graphql`
fragment featuredImageProject on WpProject {
    featuredImage{
    node {
      mediaDetails {
        sizes {
          sourceUrl
          height
          width
          name
        }
        width
      height
      }
      sourceUrl
      srcSet
      altText
      localFile {
        childImageSharp {
          fixed {
            src
            width
            height
          }
          fluid {
            srcSet
            src
          }
        }
      }
    }
    }
  }
`



export {featuredImageProject,postData,ftest}