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
    "gatsby-plugin-webpack-bundle-analyser-v2",
    'gatsby-plugin-typescript',
    
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
        },
        schema : {
          perPage: 20, // currently set to 100
      requestConcurrency: 5, // currently set to 15
      previewRequestConcurrency: 2, // currently set to 5
        }
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`, // this needs to include a path with atleast 1 file
      },
    },
    `gatsby-plugin-react-helmet`,
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaultQuality: (process.env.NODE_ENV === 'production') ? 99 : 50
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      
      cssLoaderOptions: {
        modules: {
          exportLocalsConvention: 'camelCaseOnly'
        }
      }
    },
    "gatsby-transformer-typescript-css-modules",
  ],
};
