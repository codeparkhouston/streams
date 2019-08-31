require('dotenv').config();
module.exports = {
  siteMetadata: {
    title: `Code Park Streams`,
    description: `Stream of images from Code Park events and meetups.`,
    author: `@codeparkhouston`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
	apiKey: process.env.AIRTABLE_API_KEY,
	tables: [
	  {
	    baseId: `appZPOZc1yE6xSVrm`,
	    tableName: `Goals`,
	  },
          {
	    baseId: `appx2RvGpqOa4e8Lc`,
	    tableName: `Media`,
            tableView: `Stream`,
            mapping: { Media: `fileNode` },
          },
	]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
