import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import startCase from 'lodash/startCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const GoalsListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;

  const goals = data.allAirtable.edges.map(e => e.node.data).flat();

  return (
    <Layout title={`Goals - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Goals">
        {goals.map(({ Name, Description }) => (
          <React.Fragment>
            <h3>
              {startCase(Name)}
            </h3>
            <p>
              {Description}
            </p>
          </React.Fragment>
        ))}
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query GoalsListQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allAirtable(filter: {table: {eq: "Goals"}}, sort: {fields: data___Name}) {
      edges {
        node {
          data {
            Description
            Name
          }
        }
      }
    }
  }
`;

export default GoalsListTemplate;
