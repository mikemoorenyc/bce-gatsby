import { graphql, useStaticQuery } from "gatsby";

export default function(id) {
    if (!id) {
        return null; 
    }
    const data = useStaticQuery(
        graphql`
          query {
            allImgs : allWpMediaItem {
                nodes {
                    databaseId
                    localFile {
                      childImageSharp {
                        fixed {
                          src
                        }
                      }
                    }
                }
              }
          }
        `
    )
    if(!data.allImgs.nodes.length) {
        return null;
    }
    let theImg = data.allImgs.nodes.filter(e=> e.databaseId === id);
    if(!theImg.length) {
        return null; 
    }
    theImg = theImg[0];
    return theImg.localFile.childImageSharp.fixed.src;
}