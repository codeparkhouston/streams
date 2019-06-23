'use strict';

const _ = require('lodash');
const path = require('path');
const siteConfig = require('../../config.js');

module.exports = table => (
  async (graphql, actions) => {
    const { createPage } = actions;
    const tableSlug = _.kebabCase(table);

    const result = await graphql(`
      {
        allAirtable(
          filter: {table: {eq: table}
        ) {
          edges {
            node {
              id
              data {
                Goal
                Tag_Line
              }
            }
          }
          totalCount
        }
      }
    `);

    const { postsPerPage } = siteConfig;
    const { edges, totalCount } = result.data.allAirtable;
    const numPages = Math.ceil(totalCount / postsPerPage);
    const component = path.resolve(`./src/templates/${tableSlug}-list-template.js`);

    for (let i = 0; i < numPages; i += 1) {
      createPage({
        path: i === 0 ? '/' : `/${tableSlug}/${i}`,
        component,
        context: {
          currentPage: i,
          postsLimit: postsPerPage,
          postsOffset: i * postsPerPage,
          prevPagePath: i <= 1 ? `/${tableSlug}` : `/${tableSlug}/${i - 1}`,
          nextPagePath: `/${tableSlug}/${i + 1}`,
          hasPrevPage: i !== 0,
          hasNextPage: i !== numPages - 1
        }
      });
    }
  }
);
