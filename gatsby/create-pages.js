'use strict';

const path = require('path');
const _ = require('lodash');
const createFeedsPages = require('./pagination/create-feeds-pages.js');
const createTablesPages = require('./pagination/create-tables-pages.js');
const createMediaPages = createTablesPages("Media");
const createGoalsPages = createTablesPages("Goals");

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });
  createPage({
    path: '/goals',
    component: path.resolve('./src/templates/goals-list-template.js')
  });
  //createPage({
  //  path: '/media',
  //  component: path.resolve('./src/templates/media-list-template.js')
  //});

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const { edges } = result.data.allMarkdownRemark;

  _.each(edges, (edge) => {
    if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    }
  });

  await createFeedsPages(graphql, actions);
  await createMediaPages(graphql, actions);
  await createGoalsPages(graphql, actions);
};


module.exports = createPages;
