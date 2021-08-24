const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
        allWpProject {
            nodes {
              title
              uri
              slug
            }
          }
    }
  `).then(result => {
    //highlight-start
    result.data.allWpProject.nodes.forEach(node => {
      createPage({
        path: "project/"+node.slug,
        component: path.resolve(`./src/templates/project-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
        },
      })
    })
    //highlight-end
  })
}