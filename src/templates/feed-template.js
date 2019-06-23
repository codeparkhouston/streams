import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Page from '../components/Page';
import Pagination from '../components/Pagination';

const FeedTemplate = ({ data, pageContext }) => {
  const {
    title: siteTitle,
    subtitle: siteSubtitle
  } = data.site.siteMetadata;

  const {
    goal,
    id,
  } = pageContext;

  const pageTitle = `${goal} - ${siteTitle}`;

  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={goal}>
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query FeedPage {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`;

export default FeedTemplate;
