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
          wp {
            readingSettings {
              postsPerPage
            }
          }
          
          
          
        }
  `).then(result => {
    //highlight-start
    const ppp = result.data.wp.readingSettings.postsPerPage
    
    const landingPaginator = (posts, url, template) => {
      const numPages = Math.ceil(posts.length / ppp);
      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/${url}/` : `/${url}/${i + 1}`,
          component: path.resolve(template),
          context: {
            limit: ppp,
            skip: i * ppp,
            numPages,
            currentPage: i + 1,
          },
        })
      })
    }

    //PROJECT PAGES
    const projects = result.data.allWpProject.nodes
    const end = projects.length - 1;
    projects.forEach((node,i) => {
      let prevPost=(i !== 0) ? i - 1 : end;
      let nextPost = (i !== end) ? i + 1 : 0;
      createPage({
        path: "projects/"+node.slug,
        component: path.resolve(`./src/templates/project-post.js`),
        context: {
          slug: node.slug,
          otherPosts : (projects.length > 1) ? [projects[prevPost].slug,projects[nextPost].slug] : []          
        },
      })
    })
    landingPaginator(result.data.allWpPost.edges,"blog","./src/templates/blog-landing.js");
    landingPaginator(projects,"projects","./src/templates/projects/index.js");
    //BLOG LANDING w/ Pagination 
   /* const posts = result.data.allWpPost.edges
    
    const numPages = Math.ceil(posts.length / ppp)
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/blog` : `/blog/${i + 1}`,
        component: path.resolve("./src/templates/blog-landing.js"),
        context: {
          limit: ppp,
          skip: i * ppp,
          numPages,
          currentPage: i + 1,
        },
      })
    }) */
    //TAG PAGES w/ Pagination
    result.data.allWpTag.nodes.forEach(node=>{
      
      
      let blogs = node.posts.nodes.map(e => {
        e.type = "post"
        return e;
      })
      let projects = node.projects.nodes.map( e => {
        e.type = "project"
        return e;
      });
                               
      let tagPosts = blogs.concat(projects).sort(function(a,b){
        return new Date(b.dateGmt) - new Date(a.dateGmt);
      })
      
      let tagNum = Math.ceil(tagPosts.length / ppp);
      Array.from({length: tagNum}).forEach((_,i) => {
        let postsSlice = tagPosts.slice(i * ppp, (i+1) * ppp);
        createPage({
          path: i === 0 ? "/tagged/"+node.slug : `/tagged/${node.slug}/${i+1}`,
          component: path.resolve(`./src/templates/tagged.js`),
          
          context: {
            slug: node.slug,
            tagNum,
            currentPage: i+1,
            posts: postsSlice.filter(e => e.type === "post").map(e => e.slug),
            projects : postsSlice.filter(e =>  e.type === "project").map(e => e.slug)
          }
            
          
        });
      })
      
 
    })
    //highlight-end
  })
}
