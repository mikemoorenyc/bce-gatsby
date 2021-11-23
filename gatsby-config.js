require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "BCE G",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    
    

    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
         * The full URL of the WordPress site's GraphQL API.
         * Example : 'https://www.example-site.com/graphql'
         */
        url: process.env.WORDPRESS_GRAPH_URL,
        html: {
          useGatsbyImage: false ,
        }
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-transformer-sharp",
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("node-sass")
      }
    }
  ],
};
