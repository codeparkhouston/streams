import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const FeedsListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;

  const { edges } = data.allAirtable;

  return (
    <Layout title={`Feeds - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Feeds">
        <ul>
          {edges.map((edge) => (
            <li key={edge.node.id}>
              {edge.node.data.Name}
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query AllAirtableFeeds {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allAirtable {
      edges {
        node {
          id
          data {
            Name
          }
        }
      }
    }
  }
`;

export default FeedsListTemplate;
