import React from 'react';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';

const GoalsListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;
  const {
    data: goals
  } = data.airtable;

  return (
      <Layout title={`Goals - ${title}`} description={subtitle}>
      <Sidebar />
      <Page title="Goals">
      <ul>
      {goals.map(({ Name, Description }) => (
            <li key={Name}>
            <Link to={`/goals/${kebabCase(Name)}/`}>
            {Name} - {Description}
            </Link>
            </li>
            ))}
      </ul>
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
  airtable(table: {eq: "Goals"}) {
    data {
      Name
      Description
    }
  }
}
`;

export default GoalsListTemplate;
