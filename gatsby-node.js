const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
        allWpProject(sort: {fields: menuOrder, order: ASC}) {
            nodes {
              title
              uri
              slug
            }
          }
          allWpTag(filter: {count: {gt: 0}}) {
            nodes {
              count
              posts {
                nodes {
                  title
                  slug
                  dateGmt
                }
              }
              slug
              projects {
                nodes {
                  title
                  slug
                  dateGmt
                }
              }
            }
          }
          allWpPost(sort: {fields: date, order: DESC} ){
            edges {
              node {
                slug
              }
            }
          }
    }
  `).then(result => {
    //highlight-start
    const projects = result.data.allWpProject.nodes
    const end = projects.length - 1;
    projects.forEach((node,i) => {
      let prevPost=(i !== 0) ? i - 1 : end;
      let nextPost = (i !== end) ? i + 1 : 0;
      createPage({
        path: "project/"+node.slug,
        component: path.resolve(`./src/templates/project-post.js`),
        context: {
          // This is the $slug variable
          // passed to blog-post.js
          slug: node.slug,
          otherPosts : (projects.length > 1) ? [projects[prevPost].slug,projects[nextPost].slug] : []
          
        },
      })
    })
    //BLOG LANDING w/ Pagination 
    const posts = result.data.allWpPost.edges
    const postsPerPage = 3
    const numPages = Math.ceil(posts.length / postsPerPage)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blog-landing.js"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    result.data.allWpTag.nodes.forEach(node=>{
      const blogs = node.posts.map(e => {
        e.type = "post"
        return e;
      })
      const projects = node.projects.map( e => {
        e.type = "project"
        return e;
      });
                               
      const tagPosts = blogs.concat(projects).sort(function(a,b){
        return new Date(b.dateGmt) - new Date(a.dateGmt);
      })
      const ppp = 3;
      const tagNum = Math.ceil(tagPosts.length / ppp);
      Array.from({length: tagNum}).forEach((_,i) => {
        let postsSlice = tagPosts.slice(i * ppp, (i+1) * ppp);
        createPage({
          path: i === 8 ? "/tagged"+node.slug : `/tagged/${node.slug}/${i+1}`,
          component: path.resolve(`./src/templates/tagged.js`),
          context: {
            tagNum,
            currentPage: i+1,
            posts: postsSlice.filter(e => e.type === "post").map(e => e.slug),
            projects : postsSlice.filter(e =>  e.type === "project").map(e => e.slug)
          }
            
          
        });
      })
      /*createPage({
        path: "tagged/"+node.slug,
        component: path.resolve(`./src/templates/tagged.js`),
        context: {
          slug: node.slug
        }
      })*/
    })
    //highlight-end
  })
}
